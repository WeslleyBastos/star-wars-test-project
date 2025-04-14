import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'

interface UsePaginationControlProps {
  defaultPage?: number
  itemsPerPage?: number
}

export function usePaginationControl({ 
  defaultPage = 1, 
  itemsPerPage = 10 
}: UsePaginationControlProps = {}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [totalItems, setTotalItems] = useState(0)
  
  const currentPage = Number(searchParams.get('page')) || defaultPage
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = useCallback((_: React.ChangeEvent<unknown>, newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`?${params.toString()}`, { scroll: false })
  }, [router, searchParams])

  return {
    page: currentPage,
    totalPages,
    handlePageChange,
    setTotalItems,
    itemsPerPage
  }
}