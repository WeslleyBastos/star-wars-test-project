"use client"

import { Box, Flex, Heading, Skeleton } from "@radix-ui/themes"
import { PageEvaluation } from "@/components/PageEvaluation"
import { CharacterCard } from "@/components/CharacterCard"
import { PlanetCard } from "@/components/PlanetCard"
import { useFavorites } from "@/hooks/useFavorites"
import { useQueries } from "@tanstack/react-query"
import { charactersService } from "@/services/charactersService"
import { planetsService } from "@/services/planetsService"
import { FavoriteSearch } from "@/components/Search/FavoriteSearch"
import { PaginationControls } from "@/components/PaginationControls"
import { usePaginationControl } from "@/hooks/usePagination"
import { useEffect } from "react"
import { Character } from "@/types/character"
import { Planet } from "@/types/planet"

type QueryResult = {
  character?: Character
  planet?: Planet
  type: 'character' | 'planet'
}

export default function Favorites() {
  const { favorites } = useFavorites()
  const { page, totalPages, handlePageChange, setTotalItems } = usePaginationControl({})

  const itemsPerPage = 10
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedFavorites = favorites.slice(startIndex, endIndex)

  useEffect(() => {
    setTotalItems(favorites.length)
  }, [favorites.length, setTotalItems])

  const queries = useQueries({
    queries: paginatedFavorites.map(favorite => ({
      queryKey: [favorite.type, favorite.id],
      queryFn: async () => {
        if (favorite.type === 'character') {
          const character = await charactersService.getById(favorite.id)
          return { character, type: 'character' } as QueryResult
        } else {
          const planet = await planetsService.getById(favorite.id)
          return { planet, type: 'planet' } as QueryResult
        }
      }
    }))
  })

  const isLoading = queries.some(query => query.isLoading)

  return (
    <Flex direction="column" gap="5">
      <Flex justify="end">
        <FavoriteSearch />
      </Flex>

      {favorites.length === 0 ? (
        <Heading size="4" align="center">No favorites found :(</Heading>
      ) : (
        <>
          <Box width="100%">
            <Flex direction="column" gap="6">
              <Flex gap="3" wrap="wrap">
                {isLoading ? (
                  Array.from({ length: paginatedFavorites.length }).map((_, index) => (
                    <Skeleton key={`skeleton-${index}`} width="350px" height="140px" />
                  ))
                ) : (
                  queries.map((query, index) => {
                    if (!query.data) return null
                    
                    if (query.data.type === 'character' && query.data.character) {
                      return (
                        <CharacterCard 
                          key={`character-${paginatedFavorites[index].id}`} 
                          character={query.data.character} 
                        />
                      )
                    }
                    
                    if (query.data.type === 'planet' && query.data.planet) {
                      return (
                        <PlanetCard 
                          key={`planet-${paginatedFavorites[index].id}`} 
                          planet={query.data.planet} 
                        />
                      )
                    }

                    return null
                  })
                )}
              </Flex>
            </Flex>
          </Box>

          <Flex justify="center" mt="3">
            <PaginationControls 
              page={page}
              totalPages={totalPages}
              onChange={handlePageChange}
            />
          </Flex>
        </>
      )}

      <PageEvaluation pageName="favorites" title="Favorites Page" />
    </Flex>
  )
}