'use client'
import { useFetch } from '@/hooks/useFetch'
import Spinner from '@/components/Spinner'
import ErrorMessage from '@/components/ErrorMessage'
import HotelCard from '@/components/HotelCard'
import { Hotel } from '@/types/hotel'
import Catalogs from '@/components/Catalogs'

export default function HotelsPage() {
  const { data: hotels, error, isLoading } = useFetch<Hotel[]>('/hotels')

  if (isLoading) return <Spinner />
  if (error)     return <ErrorMessage message="Error cargando hoteles" />

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Hoteles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hotels!.map(h => <HotelCard key={h.id} hotel={h} />)}
      </div>
    </div>
  )
}
