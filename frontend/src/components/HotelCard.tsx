// muestra nombre + ciudad; clicable
import Link from 'next/link'
import { Hotel } from '@/types/hotel'

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <Link href={`/hotels/${hotel.id}`}>
      <div className="cursor-pointer border p-4 rounded hover:bg-gray-100">
        <h2 className="font-semibold">{hotel.name}</h2>
        <p className="text-sm text-gray-600">{hotel.city.name}</p>
      </div>
    </Link>
  )
}
