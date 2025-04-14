import { Box, Card, DataList, Flex, Heading, Text } from "@radix-ui/themes"
import { Planet } from "@/types/planet"
import { getPlanetImage } from "@/constants/planetImages"
import { useQueries } from "@tanstack/react-query"
import { charactersService } from "@/services/charactersService"
import { capitalize, formatNumber, formatDistance } from "@/utils/formatters"
import Link from "next/link"

interface PlanetDetailsProps {
  planet: Planet
}

export function PlanetDetails({ planet }: PlanetDetailsProps) {
  const residentQueries = useQueries({
    queries: planet.residents.map(url => {
      const id = url.split('/').slice(-2)[0]
      return {
        queryKey: ['character', id],
        queryFn: () => charactersService.getById(id)
      }
    })
  })

  return (
    <Box maxWidth="800px" width="100%" mx="auto" p="4">
      <Card size="3" variant="ghost">
        <Flex direction="column" gap="6" align='center'>
          <Heading size="8" align="center" mb="4">{planet.name}</Heading>
          
          <Flex gap="6">
            <Box width="300px">
              <img
                src={getPlanetImage(planet.name)}
                alt={planet.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 'var(--radius-3)',
                  boxShadow: 'var(--shadow-4)'
                }}
              />
            </Box>

            <DataList.Root size="3">
              <DataList.Item>
                <DataList.Label minWidth="120px">Climate</DataList.Label>
                <DataList.Value>{capitalize(planet.climate)}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="120px">Terrain</DataList.Label>
                <DataList.Value>{capitalize(planet.terrain)}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="120px">Population</DataList.Label>
                <DataList.Value>{formatNumber(planet.population)}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="120px">Diameter</DataList.Label>
                <DataList.Value>{formatDistance(planet.diameter)}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="120px">Rotation Period</DataList.Label>
                <DataList.Value>{planet.rotation_period} hours</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="120px">Orbital Period</DataList.Label>
                <DataList.Value>{planet.orbital_period} days</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="120px">Gravity</DataList.Label>
                <DataList.Value>{planet.gravity}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="120px">Surface Water</DataList.Label>
                <DataList.Value>{planet.surface_water}%</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="120px">Residents</DataList.Label>
                <DataList.Value>
                  <Flex direction="column" gap="1">
                    {residentQueries.map((query, index) => {
                      const id = planet.residents[index].split('/').slice(-2)[0]
                      
                      if (query.isLoading) {
                        return <Text key={id} color="gray">Loading...</Text>
                      }

                      if (!query.data) return null

                      return (
                        <Link 
                          key={id}
                          href={`/characters/${id}`}
                          style={{ color: 'var(--amber-9)' }}
                        >
                          {query.data.name}
                        </Link>
                      )
                    })}
                  </Flex>
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Flex>
        </Flex>
      </Card>
    </Box>
  )
}