import { Autocomplete, TextField } from "@mui/material"

interface SearchOption {
  id: string
  name: string
  firstLetter: string
}

interface SearchBoxProps {
  options: SearchOption[]
  label: string
  onOptionSelected: (id: string) => void
}

export function SearchBox({ options, label, onOptionSelected }: SearchBoxProps) {
  const sortedOptions = options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))

  return (
    <Autocomplete
      size="medium"
      options={sortedOptions}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.name}
      sx={{ width: 300 }}
      onChange={(_, value) => value && onOptionSelected(value.id)}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  )
}