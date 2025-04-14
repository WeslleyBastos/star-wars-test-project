"use client"

import { Avatar, Flex, TabNav, Link as RadixLink, } from '@radix-ui/themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const pathname = usePathname()

  return (
    <Flex justify="between" align="center" width="100%">
      <Flex align="center" gap="2">
        <Avatar
          size="4"
          src="https://media.licdn.com/dms/image/v2/D4D03AQEFpzh09aDLpQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1673530682092?e=1750291200&v=beta&t=5jhzoRKAaeKtUlcAfO4BvysFX8qJ6bwDDX3cFTrQNLA"
          radius="full"
          fallback="WB"
          style={{ cursor: 'pointer' }}
          onClick={() => window.open('https://www.linkedin.com/in/wessbastos/', '_blank')}
        />
        <RadixLink 
          href="https://www.linkedin.com/in/wessbastos/" 
          target="_blank"
          style={{ cursor: 'pointer', textDecoration: 'none' }}
        >
          Weslley Bastos | Linkedin
        </RadixLink>
      </Flex>

      <TabNav.Root size="2" color="amber">
        <TabNav.Link asChild active={pathname === '/characters'}>
          <Link href="/characters">Characters</Link>
        </TabNav.Link>
        <TabNav.Link asChild active={pathname === '/planets'}>
          <Link href="/planets">Planets</Link>
        </TabNav.Link>
        <TabNav.Link asChild active={pathname === '/favorites'}>
          <Link href="/favorites">Favorites</Link>
        </TabNav.Link>
      </TabNav.Root>

      <div style={{ width: 150 }} />
    </Flex>
  )
}