import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { PaginationControls } from './PaginationControls'
import userEvent from '@testing-library/user-event'

describe('PaginationControls', () => {
  const mockOnChange = jest.fn()
  const defaultProps = {
    page: 1,
    totalPages: 5,
    onChange: mockOnChange,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders pagination with correct initial page and total pages', () => {
    render(<PaginationControls {...defaultProps} />)

    const pagination = screen.getByRole('navigation')
    expect(pagination).toBeInTheDocument()

    expect(screen.getByLabelText('page 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to page 5')).toBeInTheDocument()
  })

  it('calls onChange when a page is selected', async () => {
    render(<PaginationControls {...defaultProps} />)
    
    const page3Button = screen.getByLabelText('Go to page 3')
    await userEvent.click(page3Button)

    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith(expect.anything(), 3)
  })

  it('displays the correct active page', () => {
    render(<PaginationControls {...defaultProps} page={2} />)
    
    expect(screen.getByLabelText('page 2')).toHaveClass('Mui-selected')
  })

  it('renders the correct number of pages', () => {
    render(<PaginationControls {...defaultProps} totalPages={10} />)
    
    expect(screen.getByLabelText('Go to page 10')).toBeInTheDocument()
    expect(screen.queryByLabelText('Go to page 11')).not.toBeInTheDocument()
  })
})