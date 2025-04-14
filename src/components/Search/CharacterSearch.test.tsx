import { render, screen } from '@testing-library/react'
import { CharacterSearch } from './CharacterSearch'
import '@testing-library/jest-dom'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

jest.mock('@/hooks/useCharacters', () => ({
  useCharacterSearch: () => ({
    data: [
      { id: '1', name: 'Luke Skywalker', firstLetter: 'L' }
    ]
  })
}))

jest.mock('./SearchBox', () => ({
  SearchBox: ({ label }: { label: string }) => <div>{label}</div>
}))

describe('CharacterSearch', () => {
  it('renders with the correct search label', () => {
    render(<CharacterSearch />)
    expect(screen.getByText('Search Characters')).toBeInTheDocument()
  })
})