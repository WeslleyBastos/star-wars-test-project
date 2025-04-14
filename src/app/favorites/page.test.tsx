import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FavoritesPage from './page'
import '@testing-library/jest-dom'
import React from 'react'
import { useFavorites } from '@/hooks/useFavorites'

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

jest.mock('@/hooks/useFavorites', () => ({
  useFavorites: jest.fn(() => ({
    favorites: [
      { id: '1', type: 'character' },
      { id: '2', type: 'planet' }
    ],
    toggleFavorite: jest.fn()
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

jest.mock('@/services/charactersService', () => ({
  charactersService: {
    getById: jest.fn(() => Promise.resolve({
      name: 'Luke Skywalker',
      url: '1'
    }))
  }
}))

jest.mock('@/services/planetsService', () => ({
  planetsService: {
    getById: jest.fn(() => Promise.resolve({
      name: 'Tatooine',
      url: '2'
    }))
  }
}))

jest.mock('@/components/Search/FavoriteSearch', () => ({
  FavoriteSearch: () => <div>Favorite Search</div>
}))

jest.mock('@/components/CharacterCard', () => ({
  CharacterCard: () => <div>Character Card</div>
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

describe('Favorites Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all expected components with favorites', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <FavoritesPage />
      </QueryClientProvider>
    )

    expect(screen.getByText('Favorite Search')).toBeInTheDocument()
    expect(screen.getByText('Pagination')).toBeInTheDocument()
    expect(screen.getByText('Page Evaluation')).toBeInTheDocument()
  })

  it('shows no favorites message when empty', () => {
    (useFavorites as jest.Mock).mockReturnValueOnce({
      favorites: [],
      toggleFavorite: jest.fn()
    })
  
    render(
      <QueryClientProvider client={queryClient}>
        <FavoritesPage />
      </QueryClientProvider>
    )
  
    expect(screen.getByText('No favorites found :(')).toBeInTheDocument()
  })
})