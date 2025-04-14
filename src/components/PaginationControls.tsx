import { Flex } from '@radix-ui/themes'
import Pagination from '@mui/material/Pagination'

interface PaginationControlsProps {
  page: number
  totalPages: number
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void
}

export function PaginationControls({ page, totalPages, onChange }: PaginationControlsProps) {
  return (
    <Flex justify="center" py="4">
      <Pagination 
        count={totalPages} 
        page={page} 
        onChange={onChange}
        color="standard"
        size="medium"
      />
    </Flex>
  )
}