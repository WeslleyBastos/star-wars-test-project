import { Avatar, Box, Card, DataList, Flex, IconButton, Text } from "@radix-ui/themes"
import { StarIcon, StarFilledIcon } from "@radix-ui/react-icons"
import { useFavorites } from "@/hooks/useFavorites"
import { Planet } from "@/types/planet"
import { useRouter } from "next/navigation"
import { getPlanetImage } from "@/constants/planetImages"
import { capitalize, formatNumber } from "@/utils/formatters"

interface PlanetCardProps {
  planet: Planet
}

export function PlanetCard({ planet }: PlanetCardProps) {
  const router = useRouter()
  const { isFavorite, toggleFavorite } = useFavorites()
  const planetId = planet.url.split('/').slice(-2)[0]

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite({
      id: planetId,
      name: planet.name,
      type: 'planet',
      url: planet.url
    })
  }

  return (
    <Box width="350px" onClick={() => router.push(`/planets/${planetId}`)} style={{ cursor: 'pointer' }}>
      <Card size="2">
        <Flex direction="column" gap="3">
          <Flex gap="3" align="center" justify="between">
            <Flex gap="3" align="center">
              <Avatar 
                size="3" 
                radius="full" 
                src={getPlanetImage(planet.name)}
                fallback={planet.name[0]} 
                color="amber"
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  {planet.name}
                </Text>
              </Box>
            </Flex>
            <IconButton 
              variant="ghost" 
              color="yellow" 
              onClick={handleFavorite}
            >
              {isFavorite(planetId, 'planet') ? (
                <StarFilledIcon width="18" height="18" data-testid="star-filled" />
              ) : (
                <StarIcon width="18" height="18" data-testid="star-empty" />
              )}
            </IconButton>
          </Flex>

          <DataList.Root>
            <DataList.Item>
              <DataList.Label minWidth="100px">Climate</DataList.Label>
              <DataList.Value>
                <Text color="gray">{capitalize(planet.climate)}</Text>
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="100px">Population</DataList.Label>
              <DataList.Value>
                <Text color="gray">{formatNumber(planet.population)}</Text>
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Flex>
      </Card>
    </Box>
  )
}