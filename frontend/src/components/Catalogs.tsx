'use client'
import useSWR from 'swr'
import { api } from '@/services/api'

export default function Catalogs() {
  const { data: types } = useSWR('/room_types', u => api.get(u).then(r => r.data))
  const { data: accs }  = useSWR('/accommodations', u => api.get(u).then(r => r.data))

  if (!types || !accs) return <p>Cargando catálogos…</p>

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <div>
        <h3 className="font-semibold">Tipos de habitación</h3>
        <ul className="list-disc pl-5">
          {types.map(t => <li key={t.id}>{t.name}</li>)}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold">Acomodaciones</h3>
        <ul className="list-disc pl-5">
          {accs.map(a => <li key={a.id}>{a.name}</li>)}
        </ul>
      </div>
    </div>
  )
}
