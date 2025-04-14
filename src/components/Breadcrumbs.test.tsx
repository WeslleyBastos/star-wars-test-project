import { render, screen } from '@testing-library/react'
import { Breadcrumbs } from './Breadcrumbs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom'

jest.mock('next/navigation', () => ({
  usePathname: () => '/characters/1',
}))

jest.mock('@/services/charactersService', () => ({
  charactersService: {
    getById: jest.fn().mockResolvedValue({ name: 'Luke Skywalker' }),
  },
}))

jest.mock('@/services/planetsService', () => ({
  planetsService: {
    getById: jest.fn().mockResolvedValue({ name: 'Tatooine' }),
  },
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

describe('Breadcrumbs', () => {
  it('should render Star Wars link', async () => {
    renderWithClient(<Breadcrumbs />)
    expect(await screen.findByText('Star Wars')).toBeInTheDocument()
  })

  it('should render correct path segments', async () => {
    renderWithClient(<Breadcrumbs />)
    expect(await screen.findByText('Characters')).toBeInTheDocument()
    expect(await screen.findByText('1')).toBeInTheDocument()
  })
})
