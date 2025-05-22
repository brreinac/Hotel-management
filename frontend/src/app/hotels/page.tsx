'use client';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Hotel } from '@/types/hotel';
import Link from 'next/link';

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Hotel[]>('/hotels')
      .then(r => setHotels(r.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Cargando hoteles…</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hoteles</h1>
      <Link href="/hotels/new">
        <button className="mb-4 bg-green-500 text-white px-4 py-2 rounded">
          Nuevo Hotel
        </button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.map(h => (
          <Link key={h.id} href={`/hotels/${h.id}`}>
            <div className="p-4 bg-white rounded shadow hover:shadow-md transition">
              <h2 className="text-lg font-semibold">{h.name}</h2>
              <p className="text-sm text-gray-600">{h.city.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
