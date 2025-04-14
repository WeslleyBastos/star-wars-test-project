import { useCallback, useState, useEffect } from 'react'
import { FavoriteItem } from '@/types/favorite'

const STORAGE_KEY = 'favorites'

function safeParseFavorites(value: string | null): FavoriteItem[] {
  try {
    return value ? JSON.parse(value) : []
  } catch {
    return []
  }
}

function saveFavoritesToStorage(favorites: FavoriteItem[]) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
}

function loadFavoritesFromStorage(): FavoriteItem[] {
  if (typeof window === 'undefined') return []
  return safeParseFavorites(sessionStorage.getItem(STORAGE_KEY))
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(loadFavoritesFromStorage)

  useEffect(() => {
    saveFavoritesToStorage(favorites)
  }, [favorites])

  const toggleFavorite = useCallback((item: FavoriteItem) => {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.id === item.id && fav.type === item.type)
      const updated = exists
        ? prev.filter(fav => !(fav.id === item.id && fav.type === item.type))
        : [...prev, item]

      return updated
    })
  }, [])

  const isFavorite = useCallback((id: string, type: 'character' | 'planet'): boolean => {
    return favorites.some(fav => fav.id === id && fav.type === type)
  }, [favorites])

  return {
    favorites,
    toggleFavorite,
    isFavorite
  }
}
