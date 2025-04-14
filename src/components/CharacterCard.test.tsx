import { render, screen, fireEvent } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom'

const toggleFavoriteMock = jest.fn()
const isFavoriteMock = jest.fn().mockReturnValue(false)

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

jest.mock('@/hooks/usePlanets', () => ({
  usePlanetName: () => ({
    data: 'Tatooine',
    isLoading: false,
  }),
}))

jest.mock('@/hooks/useFavorites', () => ({
  useFavorites: () => ({
    isFavorite: isFavoriteMock,
    toggleFavorite: toggleFavoriteMock,
  }),
}))

jest.mock('@/constants/characterImages', () => ({
  getCharacterImage: (name: string) => `https://example.com/${name}.jpg`,
}))

import { CharacterCard } from './CharacterCard'

const characterMock = {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    gender: 'male',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    url: 'https://swapi.dev/api/people/1/'
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

describe('CharacterCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render character name and birth year', () => {
    renderWithClient(<CharacterCard character={characterMock} />)
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    expect(screen.getByText('19BBY')).toBeInTheDocument()
  })

  it('should render planet name as a link', () => {
    renderWithClient(<CharacterCard character={characterMock} />)
    const planetLink = screen.getByRole('link', { name: 'Tatooine' })
    expect(planetLink).toHaveAttribute('href', '/planets/1')
  })

  it('should call toggleFavorite on star icon click', () => {
    renderWithClient(<CharacterCard character={characterMock} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(toggleFavoriteMock).toHaveBeenCalledWith({
      id: '1',
      name: 'Luke Skywalker',
      type: 'character',
      url: 'https://swapi.dev/api/people/1/',
    })
  })
})
