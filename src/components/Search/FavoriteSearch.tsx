import { SearchBox } from "./SearchBox"
import { useRouter } from "next/navigation"
import { useFavorites } from "@/hooks/useFavorites"

export function FavoriteSearch() {
  const router = useRouter()
  const { favorites } = useFavorites()

  const searchOptions = favorites.map(item => ({
    id: item.id,
    name: `${item.name} (${item.type})`,
    firstLetter: item.name[0].toUpperCase(),
    type: item.type
  }))

  const handleItemSelected = (id: string) => {
    const selectedItem = favorites.find(item => item.id === id)
    if (selectedItem) {
      router.push(`/${selectedItem.type}s/${id}`)
    }
  }

  return (
    <SearchBox 
      options={searchOptions}
      label="Search Favorites"
      onOptionSelected={handleItemSelected}
    />
  )
}