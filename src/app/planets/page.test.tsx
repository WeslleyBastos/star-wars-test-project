import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PlanetsPage from './page'
import '@testing-library/jest-dom'
import React from 'react'
import { usePlanetsList } from '@/hooks/usePlanets'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn()
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
    toString: jest.fn()
  }))
}))

jest.mock('@/hooks/usePlanets', () => ({
  usePlanetsList: jest.fn(() => ({
    isLoading: false,
    data: {
      count: 2,
      results: [
        { name: 'Tatooine', url: '1' },
        { name: 'Alderaan', url: '2' }
      ]
    }
  }))
}))

jest.mock('@/hooks/usePagination', () => ({
  usePaginationControl: jest.fn(() => ({
    page: 1,
    totalPages: 1,
    handlePageChange: jest.fn(),
    setTotalItems: jest.fn()
  }))
}))

jest.mock('@/components/Search/PlanetSearch', () => ({
  PlanetSearch: () => <div>Planet Search</div>
}))

jest.mock('@/components/PlanetCard', () => ({
  PlanetCard: () => <div>Planet Card</div>
}))

jest.mock('@/components/PaginationControls', () => ({
  PaginationControls: () => <div>Pagination</div>
}))

jest.mock('@/components/PageEvaluation', () => ({
  PageEvaluation: () => <div>Page Evaluation</div>
}))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    }
  }
})

describe('Planets Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all expected components', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <PlanetsPage />
      </QueryClientProvider>
    )

    expect(screen.getByText('Planet Search')).toBeInTheDocument()
    expect(screen.getAllByText('Planet Card')).toHaveLength(2)
    expect(screen.getByText('Pagination')).toBeInTheDocument()
    expect(screen.getByText('Page Evaluation')).toBeInTheDocument()
  })

  it('shows loading state when data is loading', () => {
    (usePlanetsList as jest.Mock).mockReturnValueOnce({
      isLoading: true,
      data: undefined
    })
  
    render(
      <QueryClientProvider client={queryClient}>
        <PlanetsPage />
      </QueryClientProvider>
    )
  
    expect(screen.queryByText('Planet Card')).not.toBeInTheDocument()
  })
})