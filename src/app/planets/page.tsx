'use client'

import { Box, Flex, Heading, Link, Skeleton } from '@radix-ui/themes'
import { PageEvaluation } from '@/components/PageEvaluation'
import { PlanetCard } from '@/components/PlanetCard'
import { PaginationControls } from '@/components/PaginationControls'
import { usePaginationControl } from '@/hooks/usePagination'
import { usePlanetsList } from '@/hooks/usePlanets'
import { PlanetSearch } from '@/components/Search/PlanetSearch'
import { useEffect } from 'react'

export default function Planets() {
  const { page, totalPages, handlePageChange, setTotalItems } = usePaginationControl({})
  const { data, isLoading, isError } = usePlanetsList(page)

  useEffect(() => {
    if (data?.count) {
      setTotalItems(data.count)
    }
  }, [data?.count, setTotalItems])

  return (
    <Flex direction="column" gap="5">
      <Flex justify="end">
        <PlanetSearch />
      </Flex>

      <Box width="100%">
        {isError ? (
          <Box width="100%" height="300px">
            <Heading size="3">
              API error, please try again later. Check here for more:{' '}
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
              : data?.results?.map((planet) => (
                  <PlanetCard key={planet.name} planet={planet} />
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

      <PageEvaluation pageName="planets" title="Planets Page" />
    </Flex>
  )
}
