import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CharactersPage from './page'
import '@testing-library/jest-dom'
import React from 'react'

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

jest.mock('@/hooks/useCharacters', () => ({
  useCharactersList: jest.fn(() => ({
    isLoading: false,
    data: {
      count: 2,
      results: [
        { name: 'Luke Skywalker', url: '1' },
        { name: 'Darth Vader', url: '2' }
      ]
    }
  })),
  useCharacterSearch: jest.fn(() => ({
    isLoading: false,
    data: []
  }))
}))

jest.mock('@/hooks/usePagination', () => ({
  usePaginationControl: jest.fn(() => ({
    page: 1,
    totalPages: 2,
    handlePageChange: jest.fn(),
    setTotalItems: jest.fn()
  }))
}))

jest.mock('@/components/Search/CharacterSearch', () => ({
  CharacterSearch: () => <div>Search Component</div>
}))

jest.mock('@/components/CharacterCard', () => ({
  CharacterCard: () => <div>Character Card</div>
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

describe('Characters Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all expected components', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CharactersPage />
      </QueryClientProvider>
    )

    expect(screen.getByText('Search Component')).toBeInTheDocument()
    expect(screen.getAllByText('Character Card')).toHaveLength(2)
    expect(screen.getByText('Pagination')).toBeInTheDocument()
    expect(screen.getByText('Page Evaluation')).toBeInTheDocument()
  })
})