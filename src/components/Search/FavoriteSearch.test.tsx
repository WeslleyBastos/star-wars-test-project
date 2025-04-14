import { render, screen } from '@testing-library/react'
import { FavoriteSearch } from './FavoriteSearch'
import '@testing-library/jest-dom'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

jest.mock('@/hooks/useFavorites', () => ({
  useFavorites: () => ({
    favorites: [
      { id: '1', name: 'Luke', type: 'character' }
    ]
  })
}))

describe('FavoriteSearch', () => {
  it('renders with search label', () => {
    render(<FavoriteSearch />)
    expect(screen.getByRole('combobox', { name: 'Search Favorites' })).toBeInTheDocument()
  })
})