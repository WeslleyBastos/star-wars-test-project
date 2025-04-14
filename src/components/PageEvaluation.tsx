"use client"

import { CheckboxCards, Flex, Text } from '@radix-ui/themes'
import { useProgress } from '@/contexts/ProgressContext'
import { useEffect, useState } from 'react'

type PageEvaluationProps = {
  pageName: string
  title: string
}

export function PageEvaluation({ pageName, title }: PageEvaluationProps) {
  const { setPageProgress } = useProgress()
  const [isChecked, setIsChecked] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('pageProgress')
    if (saved) {
      const progress = JSON.parse(saved)
      setIsChecked(progress[pageName] ? ['completed'] : [])
    }
  }, [pageName])

  return (
    <CheckboxCards.Root  variant='classic'
      size="2"
      value={isChecked}
      onValueChange={(value) => {
        setIsChecked(value)
        setPageProgress(pageName, value.length > 0)
      }}
    >
      <CheckboxCards.Item value="completed">
        <Flex direction="column" width="80%">
          <Text weight="bold">{title}</Text>
          <Text>Terminou de avaliar esta etapa da aplicação? Marque o checkbox para medir o seu progresso. Que a força esteja com você</Text>
        </Flex>
      </CheckboxCards.Item>
    </CheckboxCards.Root>
  )
}