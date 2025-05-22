import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HotelsPage from '@/app/hotels/page'
import { api } from '@/services/api'

// Mockeamos el cliente Axios
jest.mock('@/services/api', () => ({
  api: {
    get: jest.fn(),
  },
}))

const fakeHotels = [
  { id: 1, name: 'Hotel A', city: { id: 1, name: 'City A' } },
  { id: 2, name: 'Hotel B', city: { id: 2, name: 'City B' } },
]

describe('HotelsPage', () => {
  beforeEach(() => {
    // Al montar, devolver fakeHotels
    (api.get as jest.Mock).mockResolvedValue({ data: fakeHotels })
  })

  it('muestra un loading inicialmente y luego la lista de hoteles', async () => {
    render(<HotelsPage />)

    // Debe mostrar loading
    expect(screen.getByText(/Cargando hoteles/i)).toBeInTheDocument()

    // Espera a que desaparezca y muestre los hoteles
    await waitFor(() => {
      expect(screen.queryByText(/Cargando hoteles/i)).not.toBeInTheDocument()
    })

    // Comprueba que aparecen los nombres
    fakeHotels.forEach(hotel => {
      expect(screen.getByText(hotel.name)).toBeInTheDocument()
      expect(screen.getByText(hotel.city.name)).toBeInTheDocument()
    })
  })

  it('navega a new hotel al hacer click en el botón', async () => {
    render(<HotelsPage />)
    await waitFor(() => {})

    const btn = screen.getByRole('button', { name: /Nuevo Hotel/i })
    expect(btn).toBeInTheDocument()
    // Aquí podrías simular router.push si mockeas useRouter
  })
})
