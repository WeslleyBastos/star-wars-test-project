'use client'

import { Flex, Separator, Text } from '@radix-ui/themes'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { charactersService } from '@/services/charactersService'
import { planetsService } from '@/services/planetsService'

const serviceMap = {
  characters: charactersService.getById,
  planets: planetsService.getById
} as const

type ServiceType = keyof typeof serviceMap

function isValidType(type: string): type is ServiceType {
  return type in serviceMap
}

function useBreadcrumbLabel(type: string, id: string) {
  return useQuery({
    queryKey: [type, id],
    queryFn: async () => {
      if (!isValidType(type)) return null
      return serviceMap[type](id)
    },
    enabled: isValidType(type)
  })
}

function BreadcrumbItem({
  path,
  href,
  type
}: {
  path: string
  href: string
  type: string
}) {
  const { data } = useBreadcrumbLabel(type, path)
  const label = data?.name ?? path.charAt(0).toUpperCase() + path.slice(1)

  return (
    <Flex gap="3" align="center">
      <Separator orientation="vertical" />
      <Link href={href}>{label}</Link>
    </Flex>
  )
}

export function Breadcrumbs() {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)

  return (
    <Text size="2">
      <Flex gap="3" align="center">
        <Link href="/">Star Wars</Link>
        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join('/')}`
          const type = index === 0 ? path : paths[0]

          return (
            <BreadcrumbItem
              key={href}
              path={path}
              href={href}
              type={type}
            />
          )
        })}
      </Flex>
      <Separator my="3" size="4" />
    </Text>
  )
}
