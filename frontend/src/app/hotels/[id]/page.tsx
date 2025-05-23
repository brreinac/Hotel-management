'use client'

import useSWR from 'swr'
import { useParams, useRouter } from 'next/navigation'
import { api } from '@/services/api'
import HotelRoomForm from '@/components/HotelRoomForm'
import { Hotel } from '@/types/hotel'
import Spinner from '@/components/Spinner'
import ErrorMessage from '@/components/ErrorMessage'

export default function HotelDetailPage() {
  const { id } = useParams()
  const router = useRouter()

  // Hook SWR con manejo de loading y error
  const { data: hotel, error, isLoading, mutate } = useSWR<Hotel>(
    `/hotels/${id}`,                            // backticks para literal de ruta
    url => api.get(url).then(res => res.data)
  )

  if (isLoading) {
    return <Spinner />
  }
  if (error) {
    return <ErrorMessage message={`Error cargando hotel: ${error.message}`} />
  }
  if (!hotel) {
    return <p className="p-4">Hotel no encontrado</p>
  }

  // Calcular cuántas habitaciones ya están asignadas
  const used = hotel.rooms?.reduce((sum, r) => sum + r.quantity, 0) ?? 0

  return (
    <div className="space-y-4">
      <button
        onClick={() => router.back()}
        className="text-blue-600 hover:underline"
      >
        ← Volver
      </button>

      <div className="bg-white p-4 rounded shadow">
        <h1 className="text-2xl font-bold">{hotel.name}</h1>
        <p className="text-sm text-gray-600">
          NIT: {hotel.nit} • Ciudad: {hotel.city.name}
        </p>
        <p className="mt-2">
          Máximo: {hotel.max_rooms} (Usadas: {used})
        </p>
      </div>

      <HotelRoomForm hotel={hotel} onAssigned={() => mutate()} />

      {hotel.rooms && hotel.rooms.length > 0 && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Habitaciones asignadas</h2>
          <ul className="divide-y">
            {hotel.rooms.map(r => (
              <li key={r.id} className="py-2 flex justify-between">
                <span>
                  {r.room_type.name} / {r.accommodation.name}: {r.quantity}
                </span>
                <button
                  className="text-red-600 hover:underline"
                  onClick={async () => {
                    await api.delete(`/hotels/${hotel.id}/rooms/${r.id}`)
                    mutate()
                  }}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex space-x-2 pt-4">
        <button
          onClick={() => router.push(`/hotels/${hotel.id}/edit`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Editar Hotel
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={async () => {
            await api.delete(`/hotels/${hotel.id}`)
            router.push('/hotels')
          }}
        >
          Eliminar Hotel
        </button>
      </div>
    </div>
  )
}
