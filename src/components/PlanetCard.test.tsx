import { render, screen, fireEvent } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom'

const toggleFavoriteMock = jest.fn()
const isFavoriteMock = jest.fn().mockReturnValue(false)

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

jest.mock('@/hooks/useFavorites', () => ({
  useFavorites: () => ({
    isFavorite: isFavoriteMock,
    toggleFavorite: toggleFavoriteMock,
  }),
}))

jest.mock('@/constants/planetImages', () => ({
  getPlanetImage: (name: string) => `https://example.com/${name}.jpg`,
}))

jest.mock('@/utils/formatters', () => ({
  capitalize: (str: string) => str.charAt(0).toUpperCase() + str.slice(1),
  formatNumber: (num: string) => num === 'unknown' ? 'unknown' : num.replace('.', ','),
  formatDistance: (num: string) => num === 'unknown' ? 'unknown' : `${num} km`,
}))

import { PlanetCard } from './PlanetCard'

const planetMock = {
  name: 'Tatooine',
  climate: 'arid',
  diameter: '10465',
  gravity: '1 standard',
  orbital_period: '304',
  population: '200000',
  rotation_period: '23',
  surface_water: '1',
  terrain: 'desert',
  url: 'https://swapi.dev/api/planets/1/',
  created: '2014-12-09T13:50:49.641000Z',
  edited: '2014-12-20T20:58:18.411000Z',
  films: [],
  residents: [],
}

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

const renderWithClient = (ui: React.ReactElement) => {
  const client = createTestQueryClient()
  return render(
    <QueryClientProvider client={client}>
      {ui}
    </QueryClientProvider>
  )
}

describe('PlanetCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render planet name and climate', () => {
    renderWithClient(<PlanetCard planet={planetMock} />)
    expect(screen.getByText('Tatooine')).toBeInTheDocument()
    expect(screen.getByText('Arid')).toBeInTheDocument()
  })

  it('should call toggleFavorite on star icon click', () => {
    renderWithClient(<PlanetCard planet={planetMock} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(toggleFavoriteMock).toHaveBeenCalledWith({
      id: '1',
      name: 'Tatooine',
      type: 'planet',
      url: 'https://swapi.dev/api/planets/1/',
    })
  })

  it('should show filled star when planet is favorite', () => {
    isFavoriteMock.mockReturnValueOnce(true)
    renderWithClient(<PlanetCard planet={planetMock} />)
    expect(screen.getByTestId('star-filled')).toBeInTheDocument()
  })

  it('should show empty star when planet is not favorite', () => {
    isFavoriteMock.mockReturnValueOnce(false)
    renderWithClient(<PlanetCard planet={planetMock} />)
    expect(screen.getByTestId('star-empty')).toBeInTheDocument()
  })
})