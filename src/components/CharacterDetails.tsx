import { Box, Card, DataList, Flex, Heading, Text } from "@radix-ui/themes"
import { Character } from "@/types/character"
import Link from "next/link"
import { getCharacterImage } from "@/constants/characterImages"
import { capitalize } from "@/utils/formatters"
import { usePlanetDetails } from "@/hooks/usePlanets"

interface CharacterDetailsProps {
  character: Character
}

export function CharacterDetails({ character }: CharacterDetailsProps) {
  const { data: planet, isLoading: isPlanetLoading } = usePlanetDetails(character.homeworld)
  const planetId = character.homeworld.split('/').slice(-2)[0]

  return (
    <Box maxWidth="800px" width="100%" mx="auto" p="4">
      <Card size="3" variant="ghost">
        <Flex direction="column" gap="6"  align="center">
          <Heading size="8" align="center" mb="4">{character.name}</Heading>
          
          <Flex gap="6">
            <Box width="300px">
              <img
                src={getCharacterImage(character.name)}
                alt={character.name}
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
                <DataList.Label minWidth="120px">Birth Year</DataList.Label>
                <DataList.Value>{character.birth_year}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="120px">Height</DataList.Label>
                <DataList.Value>{character.height} cm</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="120px">Mass</DataList.Label>
                <DataList.Value>{character.mass} kg</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="120px">Hair Color</DataList.Label>
                <DataList.Value>{capitalize(character.hair_color)}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="120px">Skin Color</DataList.Label>
                <DataList.Value>{capitalize(character.skin_color)}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="120px">Eye Color</DataList.Label>
                <DataList.Value>{capitalize(character.eye_color)}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="120px">Gender</DataList.Label>
                <DataList.Value>{capitalize(character.gender)}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="120px">Homeworld</DataList.Label>
                <DataList.Value>
                  {isPlanetLoading ? (
                    <Text color="gray">Loading...</Text>
                  ) : (
                    <Link 
                      href={`/planets/${planetId}`}
                      style={{ color: 'var(--amber-9)' }}
                    >
                      {planet?.name}
                    </Link>
                  )}
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Flex>
        </Flex>
      </Card>
    </Box>
  )
}