'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { api } from '@/services/api'
import { useRouter } from 'next/navigation'
import Catalogs from '@/components/Catalogs'
import Spinner from '@/components/Spinner'
import ErrorMessage from '@/components/ErrorMessage'

interface FormValues {
  name: string
  nit: string
  address: string
  city_id: number
  max_rooms: number
}

const schema = yup.object({
  name: yup.string().required('El nombre es obligatorio'),
  nit: yup
    .string()
    .matches(/^\d{8}-\d$/, 'Formato de NIT inválido (8 dígitos-1 dígito)')
    .required('El NIT es obligatorio'),
  address: yup.string().required('La dirección es obligatoria'),
  city_id: yup.number().required('Seleccione una ciudad'),
  max_rooms: yup
    .number()
    .typeError('Máximo debe ser un número')
    .integer('Debe ser un entero')
    .min(1, 'Debe ser al menos 1')
    .required('El máximo es obligatorio'),
}).required()

export default function NewHotelPage() {
  const router = useRouter()
  const [cities, setCities] = useState<{ id: number; name: string }[]>([])
  const [loadingCities, setLoadingCities] = useState(true)
  const [errorCities, setErrorCities] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    api
      .get('/cities')
      .then(res => {
        setCities(res.data)
      })
      .catch(() => {
        setErrorCities('No se pudieron cargar los catálogos')
      })
      .finally(() => {
        setLoadingCities(false)
      })
  }, [])

  const onSubmit = async (data: FormValues) => {
    try {
      await api.post('/hotels', data)
      router.push('/hotels')
    } catch (e: any) {
      alert(e.response?.data?.message || 'Error al crear el hotel')
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Registrar Nuevo Hotel</h1>

      {/** Catálogos generales (tipos y acomodaciones) */}
      <Catalogs />

      {/** Manejo de carga y error de ciudades (catálogo específico) */}
      {loadingCities && <Spinner />}
      {errorCities && <ErrorMessage message={errorCities} />}

      {/** Formulario solo si cargaron bien las ciudades */}
      {!loadingCities && !errorCities && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded shadow max-w-md space-y-4"
        >
          {/* Campos: name, nit, address, city_id, max_rooms */}
          <div>
            <label className="block mb-1">Nombre</label>
            <input {...register('name')} className="w-full border p-2 rounded" />
            {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block mb-1">NIT</label>
            <input {...register('nit')} className="w-full border p-2 rounded" />
            {errors.nit && <p className="text-red-500 mt-1">{errors.nit.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Dirección</label>
            <input {...register('address')} className="w-full border p-2 rounded" />
            {errors.address && <p className="text-red-500 mt-1">{errors.address.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Ciudad</label>
            <select {...register('city_id')} className="w-full border p-2 rounded">
              <option value="">— Seleccione —</option>
              {cities.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.city_id && <p className="text-red-500 mt-1">{errors.city_id.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Máximo Habitaciones</label>
            <input
              type="number"
              {...register('max_rooms')}
              className="w-full border p-2 rounded"
            />
            {errors.max_rooms && (
              <p className="text-red-500 mt-1">{errors.max_rooms.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isSubmitting ? 'Guardando...' : 'Guardar Hotel'}
          </button>
        </form>
      )}
    </div>
  )
}
