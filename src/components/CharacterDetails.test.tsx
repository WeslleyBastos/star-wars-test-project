import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom'
import { CharacterDetails } from './CharacterDetails'

jest.mock('@/hooks/usePlanets', () => ({
  usePlanetDetails: () => ({
    data: { name: 'Tatooine' },
    isLoading: false,
  }),
}))

jest.mock('@/constants/characterImages', () => ({
  getCharacterImage: (name: string) => `https://example.com/${name}.jpg`,
}))

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
  url: 'https://swapi.dev/api/people/1/',
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

describe('CharacterDetails', () => {
  it('should render character details correctly', () => {
    renderWithClient(<CharacterDetails character={characterMock} />)

    expect(screen.getByRole('heading', { name: /Luke Skywalker/i })).toBeInTheDocument()
    expect(screen.getByText('19BBY')).toBeInTheDocument()
    expect(screen.getByText('172 cm')).toBeInTheDocument()
    expect(screen.getByText('77 kg')).toBeInTheDocument()
    expect(screen.getByText('Blond')).toBeInTheDocument()
    expect(screen.getByText('Fair')).toBeInTheDocument()
    expect(screen.getByText('Blue')).toBeInTheDocument()
    expect(screen.getByText('Male')).toBeInTheDocument()
  })

  it('should render the character image with correct src and alt', () => {
    renderWithClient(<CharacterDetails character={characterMock} />)

    const image = screen.getByRole('img', { name: /Luke Skywalker/i })
    expect(image).toHaveAttribute('src', 'https://example.com/Luke Skywalker.jpg')
    expect(image).toHaveAttribute('alt', 'Luke Skywalker')
  })

  it('should render the homeworld as a link', () => {
    renderWithClient(<CharacterDetails character={characterMock} />)

    const link = screen.getByRole('link', { name: 'Tatooine' })
    expect(link).toHaveAttribute('href', '/planets/1')
  })
})
