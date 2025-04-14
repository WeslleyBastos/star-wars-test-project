import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as ReactQuery from '@tanstack/react-query'
import '@testing-library/jest-dom'
import { PlanetDetails } from './PlanetDetails'
import { Planet } from '@/types/planet'

jest.mock('@/constants/planetImages', () => ({
  getPlanetImage: (name: string) => `https://example.com/${name}.jpg`,
}))

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueries: jest.fn(),
}))

jest.mock('@/services/charactersService', () => ({
  charactersService: {
    getById: jest.fn(),
  },
}))

jest.mock('@/utils/formatters', () => ({
  capitalize: (str: string) => str.charAt(0).toUpperCase() + str.slice(1),
  formatNumber: (num: string) => {
    if (num === 'unknown') return 'unknown';
    return num.toString().replace(/\d(?=(\d{3})+$)/g, '$&.');
  },
  formatDistance: (num: string) => {
    if (num === 'unknown') return 'unknown';
    return `${num.toString().replace(/\d(?=(\d{3})+$)/g, '$&.')} km`;
  }
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

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

const mockPlanet: Planet = {
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
  residents: [
    'https://swapi.dev/api/people/1/',
    'https://swapi.dev/api/people/2/',
  ],
  films: [],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z'
}

describe('PlanetDetails', () => {
  const mockResidents = [
    { 
      name: 'Luke Skywalker',
      url: 'https://swapi.dev/api/people/1/'
    },
    { 
      name: 'C-3PO',
      url: 'https://swapi.dev/api/people/2/'
    }
  ]

  beforeEach(() => {
    jest.spyOn(ReactQuery, 'useQueries').mockReturnValue(
      mockPlanet.residents.map((_, index) => ({
        isLoading: false,
        data: mockResidents[index],
      }))
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render planet name and image', () => {
    renderWithClient(<PlanetDetails planet={mockPlanet} />)
    
    expect(screen.getByRole('heading', { name: 'Tatooine' })).toBeInTheDocument()
    const image = screen.getByRole('img', { name: 'Tatooine' })
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/Tatooine.jpg')
  })

  it('should render planet details', () => {
    renderWithClient(<PlanetDetails planet={mockPlanet} />)
    
    expect(screen.getByText('Tatooine')).toBeInTheDocument()
    expect(screen.getByText('Arid')).toBeInTheDocument()
    expect(screen.getByText('Desert')).toBeInTheDocument()
    expect(screen.getByText('200.000')).toBeInTheDocument()
    expect(screen.getByText('10.465 km')).toBeInTheDocument()
  })

  it('should render resident links', () => {
    renderWithClient(<PlanetDetails planet={mockPlanet} />)
    
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    expect(screen.getByText('C-3PO')).toBeInTheDocument()
  })
})