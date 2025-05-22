import { render, screen, waitFor } from '@testing-library/react'
import HotelsPage from '@/app/hotels/page'
import { api } from '@/services/api'

jest.mock('@/services/api', () => ({
  api: { get: jest.fn() },
}))

const fakeHotels = [
  { id: 1, name: 'Hotel A', city: { id: 1, name: 'City A' } },
  { id: 2, name: 'Hotel B', city: { id: 2, name: 'City B' } },
]

describe('HotelsPage', () => {
  beforeEach(() => {
    (api.get as jest.Mock).mockResolvedValue({ data: fakeHotels })
  })

  it('muestra la lista tras el loading', async () => {
    render(<HotelsPage />)
    expect(screen.getByText(/Cargando hoteles/i)).toBeInTheDocument()
    await waitFor(() => expect(screen.queryByText(/Cargando hoteles/i)).not.toBeInTheDocument())
    fakeHotels.forEach(h => {
      expect(screen.getByText(h.name)).toBeInTheDocument()
    })
  })
})
