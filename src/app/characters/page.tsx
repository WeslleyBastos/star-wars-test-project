'use client'

import { Box, Flex, Heading, Link, Skeleton } from '@radix-ui/themes'
import { PageEvaluation } from '@/components/PageEvaluation'
import { useCharactersList } from '@/hooks/useCharacters'
import { CharacterCard } from '@/components/CharacterCard'
import { PaginationControls } from '@/components/PaginationControls'
import { usePaginationControl } from '@/hooks/usePagination'
import { CharacterSearch } from '@/components/Search/CharacterSearch'
import { useEffect } from 'react'

export default function Characters() {
  const { page, totalPages, handlePageChange, setTotalItems } = usePaginationControl({})
  const { data, isLoading, isError } = useCharactersList(page)

  useEffect(() => {
    if (data?.count) {
      setTotalItems(data.count)
    }
  }, [data?.count, setTotalItems])

  return (
    <Flex direction="column" gap="5">
      <Flex justify="end">
        <CharacterSearch />
      </Flex>

      <Box width="100%">
        {isError ? (
          <Box width="100%" height="300px">
            <Heading size="3">
              API error, please try again later. Check here for more:  
              <Link href="https://swapi.dev/" target="_blank" rel="noopener noreferrer">
               swapi.dev
              </Link>
            </Heading>
          </Box>
        ) : (
          <Flex gap="3" wrap="wrap">
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <Skeleton key={`skeleton-${index}`} width="350px" height="140px" />
                ))
              : data?.results?.map((character) => (
                  <CharacterCard key={character.name} character={character} />
                ))}
          </Flex>
        )}
      </Box>

      <Flex justify="center" mt="3">
        <PaginationControls
          page={page}
          totalPages={totalPages}
          onChange={handlePageChange}
        />
      </Flex>

      <PageEvaluation pageName="characters" title="Characters Page" />
    </Flex>
  )
}
