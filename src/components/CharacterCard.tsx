import { Avatar, Box, Card, DataList, Flex, IconButton, Text } from "@radix-ui/themes"
import { StarIcon, StarFilledIcon } from "@radix-ui/react-icons"
import { useFavorites } from "@/hooks/useFavorites"
import { Character } from "@/types/character"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getCharacterImage } from '@/constants/characterImages'
import { usePlanetName } from "@/hooks/usePlanets"

interface CharacterCardProps {
  character: Character
}

export function CharacterCard({ character }: CharacterCardProps) {
  const router = useRouter()
  const { data: planetName, isLoading: isPlanetLoading } = usePlanetName(character.homeworld)
  const { isFavorite, toggleFavorite } = useFavorites()
  const characterId = character.url.split('/').slice(-2)[0]

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite({
      id: characterId,
      name: character.name,
      type: 'character',
      url: character.url
    })
  }

  return (
    <Box width="350px" onClick={() => router.push(`/characters/${characterId}`)} style={{ cursor: 'pointer' }}>
      <Card size="2">
        <Flex direction="column" gap="3">
          <Flex gap="3" align="center" justify="between">
            <Flex gap="3" align="center">
              <Avatar 
                size="3" 
                radius="full" 
                src={getCharacterImage(character.name)}
                fallback={character.name[0]} 
                color="amber" 
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  {character.name}
                </Text>
              </Box>
            </Flex>
            <IconButton 
              variant="ghost" 
              color="yellow" 
              onClick={handleFavorite}
            >
              {isFavorite(characterId, 'character') ? (
                <StarFilledIcon width="18" height="18" />
              ) : (
                <StarIcon width="18" height="18" />
              )}
            </IconButton>
          </Flex>

          <DataList.Root>
            <DataList.Item>
              <DataList.Label minWidth="100px">Birth Year</DataList.Label>
              <DataList.Value>
                <Text color="gray">{character.birth_year}</Text>
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="100px">Homeworld</DataList.Label>
              <DataList.Value>
                {isPlanetLoading ? (
                  <Text color="gray">Loading...</Text>
                ) : (
                  <Link 
                    href={`/planets/${character.homeworld.split('/').slice(-2)[0]}`}
                    style={{ color: 'var(--amber-9)' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {planetName}
                  </Link>
                )}
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Flex>
      </Card>
    </Box>
  )
}