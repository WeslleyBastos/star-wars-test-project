import { capitalize, formatNumber, formatDistance } from './formatters'

describe('capitalize', () => {
  it('capitalizes the first letter', () => {
    expect(capitalize('hello')).toBe('Hello')
  })

  it('returns "Unknown" for empty input', () => {
    expect(capitalize('')).toBe('Unknown')
  })
})

describe('formatNumber', () => {
  it('formats numbers correctly', () => {
    expect(formatNumber('1000')).toBe('1,000')
    expect(formatNumber(2500)).toBe('2,500')
  })

  it('returns "Unknown" for invalid inputs', () => {
    expect(formatNumber('unknown')).toBe('Unknown')
    expect(formatNumber('n/a')).toBe('Unknown')
    expect(formatNumber('abc')).toBe('Unknown')
  })
})

describe('formatDistance', () => {
  it('formats distance with km suffix', () => {
    expect(formatDistance('1000')).toBe('1,000 km')
    expect(formatDistance(2500)).toBe('2,500 km')
  })

  it('returns "Unknown" for invalid inputs', () => {
    expect(formatDistance('unknown')).toBe('Unknown')
    expect(formatDistance('n/a')).toBe('Unknown')
  })
})