import { useQuery, useQueryClient } from '@tanstack/react-query'
import { charactersService } from '@/services/charactersService'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { useEffect } from 'react'

export function useCharactersList(page: number) {
  const queryClient = useQueryClient()

  useEffect(() => {
    const pagesToPrefetch = [page + 1, page + 2]
    
    pagesToPrefetch.forEach(nextPage => {
      if (nextPage <= 5) {
        queryClient.prefetchQuery({
          queryKey: [QUERY_KEYS.CHARACTERS_LIST, nextPage],
          queryFn: () => charactersService.getAll(nextPage),
          staleTime: 5 * 60 * 1000,
          retry: 1
        })
      }
    })
  }, [page, queryClient])

  return useQuery({
    queryKey: [QUERY_KEYS.CHARACTERS_LIST, page],
    queryFn: () => charactersService.getAll(page),
    staleTime: 5 * 60 * 1000, 
    retry: 2,
    placeholderData: (previousData) => previousData
  })
}

export function useCharacterDetails(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.CHARACTER_DETAILS, id],
    queryFn: () => charactersService.getById(id),
    staleTime: 10 * 60 * 1000,
    retry: 2
  })
}

export function useCharacterSearch() {
  return useQuery({
    queryKey: [QUERY_KEYS.CHARACTERS_SEARCH],
    queryFn: async () => {
      const characters = await charactersService.getAllCharacters()
      return characters.map(char => ({
        id: char.url.split('/').slice(-2)[0],
        name: char.name,
        firstLetter: char.name[0].toUpperCase()
      }))
    }
  })
}