import { useCharacterSearch } from "@/hooks/useCharacters"
import { SearchBox } from "./SearchBox"
import { useRouter } from "next/navigation"

export function CharacterSearch() {
  const router = useRouter()
  const { data } = useCharacterSearch()

  const handleCharacterSelected = (id: string) => {
    router.push(`/characters/${id}`)
  }

  return (
    <SearchBox 
      options={data || []}
      label="Search Characters"
      onOptionSelected={handleCharacterSelected}
    />
  )
}