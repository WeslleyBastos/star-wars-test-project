import { render, screen } from '@testing-library/react'
import { SearchBox } from './SearchBox'
import '@testing-library/jest-dom'

describe('SearchBox', () => {
  const mockOptions = [
    { id: '1', name: 'Tatooine', firstLetter: 'T' },
    { id: '2', name: 'Alderaan', firstLetter: 'A' }
  ]

  it('renders with options', () => {
    render(
      <SearchBox 
        options={mockOptions}
        label="Test Search"
        onOptionSelected={jest.fn()}
      />
    )
    
    expect(screen.getByLabelText('Test Search')).toBeInTheDocument()
  })
})