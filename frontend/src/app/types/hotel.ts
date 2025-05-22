export interface Hotel {
  id: number;
  name: string;
  nit: string;
  address: string;
  city: { id: number; name: string };
  max_rooms: number;
  rooms?: Array<{
    id: number;
    room_type: { id: number; name: string };
    accommodation: { id: number; name: string };
    quantity: number;
  }>;
}
