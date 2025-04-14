"use client"

import { Progress } from '@radix-ui/themes'
import { useProgress } from '@/contexts/ProgressContext'

export function ProgressBar() {
  const { totalProgress } = useProgress()
  return <Progress value={totalProgress} color="amber" />
}