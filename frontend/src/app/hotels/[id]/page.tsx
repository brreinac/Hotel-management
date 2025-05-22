'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { api } from '@/services/api'
import { Hotel } from '@/types/hotel'
import HotelRoomForm from '@/components/HotelRoomForm'

export default function HotelDetailPage() {
  const router = useRouter()
  const { id } = useParams() as { id: string }

  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.get<Hotel>(`/hotels/${id}`)
      .then(res => setHotel(res.data))
      .catch(() => setError('No se pudo cargar el hotel'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className="p-4">Cargando hotel…</p>
  if (error)   return <p className="p-4 text-red-500">{error}</p>
  if (!hotel) return <p className="p-4">Hotel no encontrado</p>

  const usedRooms = hotel.rooms?.reduce((sum, r) => sum + r.quantity, 0) ?? 0

  return (
    <main className="p-6 space-y-6">
      <button
        className="text-blue-600 hover:underline"
        onClick={() => router.push('/hotels')}
      >
        ← Volver
      </button>
      <div className="bg-white p-4 rounded shadow">
        <h1 className="text-2xl font-bold">{hotel.name}</h1>
        <p className="text-sm text-gray-600">
          NIT: {hotel.nit} • Ciudad: {hotel.city.name}
        </p>
        <p className="mt-2">
          Máx habitaciones: {hotel.max_rooms}(usadas: {usedRooms})
        </p>
      </div>

      <HotelRoomForm
        hotel={hotel}
        onAssigned={() => {
          // recarga los datos del hotel
          setLoading(true)
          api.get<Hotel>(`/hotels/${id}`)
            .then(res => setHotel(res.data))
            .finally(() => setLoading(false))
        }}
      />

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
                    // recarga
                    setLoading(true)
                    api.get<Hotel>(`/hotels/${id}`)
                      .then(res => setHotel(res.data))
                      .finally(() => setLoading(false))
                  }}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  )
}