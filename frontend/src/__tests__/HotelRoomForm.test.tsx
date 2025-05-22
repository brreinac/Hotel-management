import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HotelRoomForm from '@/components/HotelRoomForm'
import { api } from '@/services/api'
import useSWR from 'swr'

jest.mock('swr')
jest.mock('@/services/api', () => ({ api: { post: jest.fn() } }))

const fakeTypes = [{ id: 1, code: 'EST', name: 'Estándar' }]
const fakeAccs = [{ id: 10, code: 'SEN', name: 'Sencilla' }, { id: 11, code: 'DOB', name: 'Doble' }]
const hotelMock = { id: 123, max_rooms: 5, rooms: [{ id: 1, quantity: 2 }] }

describe('HotelRoomForm', () => {
  beforeEach(() => {
    (useSWR as jest.Mock).mockImplementation(key => ({
      data: key === '/room_types' ? fakeTypes : fakeAccs
    }))
  })

  it('valida campos vacíos', async () => {
    render(<HotelRoomForm hotel={hotelMock as any} onAssigned={jest.fn()} />)
    userEvent.click(screen.getByRole('button', { name: /Asignar/i }))
    await waitFor(() => {
      expect(screen.getByText(/Seleccione un tipo/i)).toBeInTheDocument()
      expect(screen.getByText(/Seleccione una acomodación/i)).toBeInTheDocument()
      expect(screen.getByText(/Ingrese cantidad/i)).toBeInTheDocument()
    })
  })
})
