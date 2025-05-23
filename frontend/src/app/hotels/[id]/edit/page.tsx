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
    .integer('Debe ser un entero')
    .min(1, 'Mínimo 1')
    .required('Ingrese cantidad')
    .test('max-rooms', 'Excede el máximo de habitaciones', function(value) {
      const { max_rooms, rooms } = this.options.context as Hotel
      const used = rooms?.reduce((s, r) => s + r.quantity, 0) ?? 0
      return (used + (value ?? 0)) <= max_rooms
    })
}).required()

const fetcher = (url: string) => api.get(url).then(r => r.data)

export default function HotelRoomForm({ hotel, onAssigned }: Props) {
  // Nota la barra inicial en '/room_types' y '/accommodations'
  const { data: types, error: errT } = useSWR('/room_types', fetcher)
  const { data: accs, error: errA } = useSWR('/accommodations', fetcher)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema, { context: hotel }),
  })

  const selectedTypeId = watch('room_type_id')

  // Mapping de códigos a acomodaciones permitidas
  const allowedMapping: Record<string, string[]> = {
    EST: ['SEN','DOB'],
    JUN: ['TRI','CUA'],
    SUI: ['SEN','DOB','TRI'],
  }

  // Crea un map id→code de types
  const typeMap: Record<number, string> = {}
  types?.forEach((t: any) => {
    typeMap[t.id] = t.code
  })

  // Filtra acomodaciones
  const filteredAccs = accs?.filter((a: any) => {
    const code = typeMap[selectedTypeId]
    return allowedMapping[code]?.includes(a.code)
  }) ?? []

  // Cada vez que cambie el tipo, resetea acomodación
  useEffect(() => {
    reset({ ...watch(), accommodation_id: undefined })
  }, [selectedTypeId])

  if (errT || errA) {
    return <p className="text-red-600">Error cargando catálogos</p>
  }
  if (!types || !accs) {
    return <p>Cargando catálogos…</p>
  }

  const onSubmit = async (data: FormValues) => {
    await api.post(`/hotels/${hotel.id}/rooms`, data)
    reset()
    onAssigned()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Tipo</label>
        <select {...register('room_type_id')} className="w-full border p-2 rounded">
          <option value="">— Seleccione —</option>
          {types.map((t: any) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        {errors.room_type_id && <p className="text-red-500">{errors.room_type_id.message}</p>}
      </div>
      <div>
        <label>Acomodación</label>
        <select {...register('accommodation_id')} className="w-full border p-2 rounded">
          <option value="">— Seleccione —</option>
          {filteredAccs.map((a: any) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
        {errors.accommodation_id && <p className="text-red-500">{errors.accommodation_id.message}</p>}
      </div>
      <div>
        <label>Cantidad</label>
        <input type="number" {...register('quantity')} className="w-full border p-2 rounded" />
        {errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>}
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Asignar
      </button>
    </form>
  )
}
