export interface City {
  id: number
  name: string
}

export interface RoomAssignment {
  id: number
  quantity: number
  room_type: { id: number; name: string; code: string }
  accommodation: { id: number; name: string; code: string }
}

export interface Hotel {
  id: number
  name: string
  nit: string
  address: string
  city: City
  max_rooms: number
  rooms?: RoomAssignment[]
}
