'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { api } from '@/services/api'

interface FormValues { name:string; nit:string; address:string; city_id:number; max_rooms:number }

const schema = yup.object({
  /* mismo esquema que en new */
})

export default function EditHotelPage() {
  const { id } = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [cities, setCities] = useState<{id:number;name:string}[]>([])
  const { register, handleSubmit, reset, formState:{ errors } } = useForm<FormValues>({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    // Traer datos del hotel
    api.get(`/hotels/${id}`)
      .then(r => reset({
        name: r.data.name,
        nit: r.data.nit,
        address: r.data.address,
        city_id: r.data.city.id,
        max_rooms: r.data.max_rooms,
      }))
      .finally(() => setLoading(false))

    // Traer ciudades
    api.get('/cities').then(r => setCities(r.data))
  }, [id, reset])

  const onSubmit = async (data: FormValues) => {
    await api.put(`/hotels/${id}`, data)
    router.push(`/hotels/${id}`)
  }

  if (loading) return <p>Cargando datos…</p>

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Repite los campos como en NewHotelPage */}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Actualizar Hotel
      </button>
    </form>
  )
}
