import { api } from './api'
import { Planet, PlanetResponse } from '@/types/planet'

export const planetsService = {
  getAll: async (page: number): Promise<PlanetResponse> => {
    const { data } = await api.get(`/planets/?page=${page}`)
    return data
  },

  getById: async (id: string): Promise<Planet> => {
    const { data } = await api.get(`/planets/${id}/`)
    return data
  },

  getAllPlanets: async () => {
    const allPlanets = []
    let nextPage = 1
    let hasMore = true

    while (hasMore) {
      const response = await planetsService.getAll(nextPage)
      allPlanets.push(...response.results)
      hasMore = !!response.next
      nextPage++
    }

    return allPlanets
  }
}