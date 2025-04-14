import { usePlanetSearch } from "@/hooks/usePlanets"
import { SearchBox } from "./SearchBox"
import { useRouter } from "next/navigation"

export function PlanetSearch() {
  const router = useRouter()
  const { data } = usePlanetSearch()

  const handlePlanetSelected = (id: string) => {
    router.push(`/planets/${id}`)
  }

  return (
    <SearchBox 
      options={data || []}
      label="Search Planets"
      onOptionSelected={handlePlanetSelected}
    />
  )
}