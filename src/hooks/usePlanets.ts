import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { planetsService } from '@/services/planetsService'
import { QUERY_KEYS } from '@/constants/queryKeys'

function extractPlanetId(url: string): string {
  return url.split('/').slice(-2)[0]
}

export function usePlanetsList(page: number) {
  const queryClient = useQueryClient()

  useEffect(() => {
    const nextPage = page + 1
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.PLANETS_LIST, nextPage],
      queryFn: () => planetsService.getAll(nextPage)
    })
  }, [page, queryClient])

  return useQuery({
    queryKey: [QUERY_KEYS.PLANETS_LIST, page],
    queryFn: () => planetsService.getAll(page)
  })
}

export function usePlanetDetails(idOrUrl: string) {
  const id = useMemo(() => extractPlanetId(idOrUrl), [idOrUrl])

  return useQuery({
    queryKey: [QUERY_KEYS.PLANET_DETAILS, id],
    queryFn: () => planetsService.getById(id),
    enabled: !!id
  })
}

export function usePlanetName(url: string) {
  const id = useMemo(() => extractPlanetId(url), [url])

  return useQuery({
    queryKey: [QUERY_KEYS.PLANET_NAME, id],
    queryFn: async () => {
      const planet = await planetsService.getById(id)
      return planet.name
    },
    enabled: !!url
  })
}

export function usePlanetSearch() {
  return useQuery({
    queryKey: [QUERY_KEYS.PLANETS_SEARCH],
    queryFn: async () => {
      const planets = await planetsService.getAllPlanets()
      return planets.map(planet => ({
        id: extractPlanetId(planet.url),
        name: planet.name,
        firstLetter: planet.name[0]?.toUpperCase() ?? ''
      }))
    }
  })
}
