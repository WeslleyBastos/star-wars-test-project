import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Navigation } from './Navigation'
import { usePathname } from 'next/navigation'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

const mockedUsePathname = usePathname as jest.Mock

describe('Navigation', () => {
  it('renders navigation with all links', () => {
    mockedUsePathname.mockReturnValue('/characters')

    render(<Navigation />)

    const nav = screen.getByRole('navigation')
    const utils = within(nav)

    expect(utils.getByRole('link', { name: /Characters/i })).toBeInTheDocument()
    expect(utils.getByRole('link', { name: /Planets/i })).toBeInTheDocument()
    expect(utils.getByRole('link', { name: /Favorites/i })).toBeInTheDocument()
  })
})