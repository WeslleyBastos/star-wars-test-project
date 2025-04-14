// src/components/Search/PlanetSearch.test.tsx
import { render, screen } from '@testing-library/react'
import { PlanetSearch } from './PlanetSearch'
import '@testing-library/jest-dom'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

jest.mock('@/hooks/usePlanets', () => ({
  usePlanetSearch: () => ({
    data: [
      { id: '1', name: 'Tatooine', firstLetter: 'T' }
    ]
  })
}))

describe('PlanetSearch', () => {
  it('renders with search label', () => {
    render(<PlanetSearch />)
    expect(screen.getByRole('combobox', { name: 'Search Planets' })).toBeInTheDocument()
  })
})