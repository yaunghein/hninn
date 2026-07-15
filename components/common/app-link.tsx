import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

import {
  isExternalHref,
  isInternalHref,
  normalizeHref,
} from '@/lib/utils/link'

type AppLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  href: string
}

export default function AppLink({ href, ...props }: AppLinkProps) {
  const normalized = normalizeHref(href)

  if (isInternalHref(href)) {
    return <Link href={normalized} {...props} />
  }

  return (
    <a
      href={normalized}
      {...(isExternalHref(href)
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      {...props}
    />
  )
}
