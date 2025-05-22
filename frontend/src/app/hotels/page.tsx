'use client'

import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import { api } from '@/services/api'
import { Hotel } from '@/types/hotel'

export default function HotelsPage() {
  const { data: hotels, isLoading } = useSWR<Hotel[]>('/hotels', url =>
    api.get(url).then(res => res.data)
  )
  const router = useRouter()

  if (isLoading) return <p>Cargando hoteles…</p>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Hoteles</h1>
      <button
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => router.push('/hotels/new')}
      >
        Nuevo Hotel
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hotels!.map(hotel => (
          <div
            key={hotel.id}
            onClick={() => router.push(`/hotels/${hotel.id}`)}
            className="cursor-pointer border p-4 rounded hover:bg-gray-100"
          >
            <h2 className="font-semibold">{hotel.name}</h2>
            <p className="text-sm text-gray-600">{hotel.city.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
