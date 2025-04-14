import { api } from './api'
import { Character, CharacterResponse } from '@/types/character'

const API_TIMEOUT = 3000
const apiConfig = { timeout: API_TIMEOUT }

export const charactersService = {
  getAll: async (page: number): Promise<CharacterResponse> => {
    try {
      const { data } = await api.get(`/people/?page=${page}`, apiConfig)
      return data
    } catch (error) {
      console.error(`Error fetching characters on page ${page}:`, error)
      throw error
    }
  },

  getById: async (id: string): Promise<Character> => {
    try {
      const { data } = await api.get(`/people/${id}/`, apiConfig)
      return data
    } catch (error) {
      console.error(`Error fetching character with id ${id}:`, error)
      throw error
    }
  },

  searchCharacters: async (searchTerm: string): Promise<
    { id: string; name: string; firstLetter: string }[]
  > => {
    try {
      const { data } = await api.get(`/people/?search=${searchTerm}`, apiConfig)
      return data.results.map((char: Character) => ({
        id: char.url.split('/').slice(-2)[0],
        name: char.name,
        firstLetter: char.name[0]?.toUpperCase() ?? ''
      }))
    } catch (error) {
      console.error(`Error searching characters with term "${searchTerm}":`, error)
      return []
    }
  },

  getAllCharacters: async (maxPages = 3): Promise<Character[]> => {
    const allCharacters: Character[] = []
    let nextPage = 1

    while (nextPage <= maxPages) {
      try {
        const response = await charactersService.getAll(nextPage)
        allCharacters.push(...response.results)
        if (!response.next) break
        nextPage++
      } catch (error) {
        console.error('Error fetching characters page', nextPage, error)
        break
      }
    }

    return allCharacters
  }
}
