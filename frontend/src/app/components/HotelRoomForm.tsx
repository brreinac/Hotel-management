'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useSWR from 'swr'
import { api } from '@/services/api'
import { Hotel } from '@/types/hotel'

interface Props {
  hotel: Hotel
  onAssigned: () => void
}

interface FormValues {
  room_type_id: number
  accommodation_id: number
  quantity: number
}

const schema = yup.object({
  room_type_id: yup.number().required('Seleccione un tipo de habitación'),
  accommodation_id: yup.number().required('Seleccione una acomodación'),
  quantity: yup
    .number()
    .typeError('Cantidad debe ser un número')
    .integer('Cantidad debe ser entera')
    .min(1, 'Mínimo 1')
    .required('Ingrese cantidad')
    .test(
      'max-rooms',
      'Excede el máximo de habitaciones',
      function (value) {
        const { max_rooms, rooms } = this.options.context as Hotel
        const used = rooms?.reduce((sum, r) => sum + r.quantity, 0) ?? 0
        return (used + (value ?? 0)) <= max_rooms
      }
    ),
}).required()

const fetcher = (url: string) => api.get(url).then(r => r.data)

export default function HotelRoomForm({ hotel, onAssigned }: Props) {
  // Datos de catálogo
  const { data: types } = useSWR('/room_types', fetcher)
  const { data: accs }  = useSWR('/accommodations', fetcher)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema, { context: hotel }),
  })

  // Para filtrar acomodaciones según tipo
  const selectedTypeId = watch('room_type_id')
  const allowedMapping: Record<string, string[]> = {
    EST: ['SEN', 'DOB'],
    JUN: ['TRI', 'CUA'],
    SUI: ['SEN', 'DOB', 'TRI'],
  }

  // Construir map de códigos
  const typeMap: Record<number, string> = {}
  types?.forEach((t: any) => { typeMap[t.id] = t.code })

  const filteredAccs = accs?.filter((a: any) => {
    const typeCode = typeMap[selectedTypeId]
    return allowedMapping[typeCode]?.includes(a.code)
  }) ?? []

  const onSubmit = async (data: FormValues) => {
    await api.post(`/hotels/${hotel.id}/rooms`, data)
    reset()
    onAssigned()
  }

  // Resetea al cambio de tipo para evitar acomodación no válida
  useEffect(() => {
    reset({ ...watch(), accommodation_id: undefined })
  }, [selectedTypeId])

  if (!types || !accs) return <p>Cargando catálogos…</p>

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">Asignar habitación</h2>

      <div>
        <label className="block mb-1">Tipo de habitación</label>
        <select
          {...register('room_type_id')}
          className="w-full border p-2 rounded"
        >
          <option value="">— Seleccione —</option>
          {types.map((t: any) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        {errors.room_type_id && (
          <p className="text-red-500 mt-1">{errors.room_type_id.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Acomodación</label>
        <select
          {...register('accommodation_id')}
          className="w-full border p-2 rounded"
        >
          <option value="">— Seleccione —</option>
          {filteredAccs.map((a: any) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
        {errors.accommodation_id && (
          <p className="text-red-500 mt-1">{errors.accommodation_id.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Cantidad</label>
        <input
          type="number"
          {...register('quantity')}
          className="w-full border p-2 rounded"
        />
        {errors.quantity && (
          <p className="text-red-500 mt-1">{errors.quantity.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isSubmitting ? 'Asignando...' : 'Asignar'}
      </button>
    </form>
  )
}
