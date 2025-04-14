"use client"

import { createContext, useContext, useState, useEffect } from 'react'

type ProgressContextType = {
  setPageProgress: (page: string, completed: boolean) => void
  totalProgress: number
}

const ProgressContext = createContext<ProgressContextType | null>(null)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedPages, setCompletedPages] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const saved = localStorage.getItem('pageProgress')
    if (saved) {
      setCompletedPages(JSON.parse(saved))
    }
  }, [])

  const setPageProgress = (page: string, completed: boolean) => {
    const newProgress = { ...completedPages, [page]: completed }
    setCompletedPages(newProgress)
    localStorage.setItem('pageProgress', JSON.stringify(newProgress))
  }

  const totalProgress = (Object.values(completedPages).filter(Boolean).length / 3) * 100

  return (
    <ProgressContext.Provider value={{ setPageProgress, totalProgress }}>
      {children}
    </ProgressContext.Provider>
  )
}

export const useProgress = () => {
  const context = useContext(ProgressContext)
  if (!context) throw new Error('useProgress must be used within ProgressProvider')
  return context
}