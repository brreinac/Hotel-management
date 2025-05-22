'use client'

import useSWR from 'swr'
import { useParams } from 'next/navigation'
import { api } from '@/services/api'
import HotelRoomForm from '@/components/HotelRoomForm'
import { Hotel } from '@/types/hotel'

export default function HotelDetailPage() {
  const { id } = useParams()
  const { data: hotel, mutate } = useSWR<Hotel>(`/hotels/${id}`, url =>
    api.get(url).then(res => res.data)
  )

  if (!hotel) return <p>Cargando hotel…</p>

  const used = hotel.rooms?.reduce((sum, r) => sum + r.quantity, 0) ?? 0

  return (
    <div>
      <button onClick={() => history.back()} className="text-blue-600 hover:underline mb-4">
        ← Volver
      </button>
      <h1 className="text-2xl font-bold">{hotel.name}</h1>
      <p className="text-sm text-gray-600">
        NIT: {hotel.nit} • Ciudad: {hotel.city.name}
      </p>
      <p className="mt-2">
        Máximo: {hotel.max_rooms} (Usadas: {used})
      </p>

      <HotelRoomForm hotel={hotel} onAssigned={() => mutate()} />

      {hotel.rooms && hotel.rooms.length > 0 && (
        <div className="mt-6">
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
    </div>
  )
}
