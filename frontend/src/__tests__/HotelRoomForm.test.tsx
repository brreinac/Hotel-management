import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HotelRoomForm from '@/components/HotelRoomForm'
import { api } from '@/services/api'
import useSWR from 'swr'

// Mock de SWR
jest.mock('swr')

// Mock de api
jest.mock('@/services/api', () => ({
  api: {
    post: jest.fn(),
  },
}))

const fakeTypes = [
  { id: 1, code: 'EST', name: 'Estándar' },
]
const fakeAccs = [
  { id: 10, code: 'SEN', name: 'Sencilla' },
  { id: 11, code: 'DOB', name: 'Doble' },
]

const hotelMock = {
  id: 123,
  max_rooms: 5,
  rooms: [{ id: 1, quantity: 2 }],
  // otros campos no usados aquí...
}

describe('HotelRoomForm', () => {
  beforeEach(() => {
    ;(useSWR as jest.Mock)
      .mockImplementation((key: string) => {
        if (key === '/room_types') return { data: fakeTypes }
        if (key === '/accommodations') return { data: fakeAccs }
        return { data: [] }
      })
  })

  it('muestra errores cuando el formulario está vacío', async () => {
    render(<HotelRoomForm hotel={hotelMock as any} onAssigned={jest.fn()} />)

    // Submit sin rellenar
    const button = screen.getByRole('button', { name: /Asignar/i })
    userEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText(/Seleccione un tipo de habitación/i)).toBeInTheDocument()
      expect(screen.getByText(/Seleccione una acomodación/i)).toBeInTheDocument()
      expect(screen.getByText(/Ingrese cantidad/i)).toBeInTheDocument()
    })
  })

  it('filtra acomodaciones según el tipo seleccionado y no excede el máximo', async () => {
    render(<HotelRoomForm hotel={hotelMock as any} onAssigned={jest.fn()} />)

    // Selecciona tipo "Estándar" (id=1)
    userEvent.selectOptions(screen.getByLabelText(/Tipo de habitación/i), '1')

    // Solo debe mostrar "Sencilla" y "Doble"
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Sencilla' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Doble' })).toBeInTheDocument()
    })

    // Ingresa cantidad que excede (5 - 2 = 3 máximo; probamos 4)
    userEvent.selectOptions(screen.getByLabelText(/Acomodación/i), '10')
    userEvent.clear(screen.getByLabelText(/Cantidad/i))
    userEvent.type(screen.getByLabelText(/Cantidad/i), '4')
    userEvent.click(screen.getByRole('button', { name: /Asignar/i }))

    await waitFor(() => {
      expect(screen.getByText(/Excede el máximo de habitaciones/i)).toBeInTheDocument()
    })
  })

  it('envía la petición correctamente cuando todo es válido', async () => {
    const onAssigned = jest.fn()
    ;(api.post as jest.Mock).mockResolvedValue({})

    render(<HotelRoomForm hotel={hotelMock as any} onAssigned={onAssigned} />)

    // Rellena correctamente (cantidad ≤ 3)
    userEvent.selectOptions(screen.getByLabelText(/Tipo de habitación/i), '1')
    userEvent.selectOptions(screen.getByLabelText(/Acomodación/i), '10')
    userEvent.clear(screen.getByLabelText(/Cantidad/i))
    userEvent.type(screen.getByLabelText(/Cantidad/i), '3')
    userEvent.click(screen.getByRole('button', { name: /Asignar/i }))

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(`/hotels/${hotelMock.id}/rooms`, {
        room_type_id: 1,
        accommodation_id: 10,
        quantity: 3,
      })
      expect(onAssigned).toHaveBeenCalled()
    })
  })
})
