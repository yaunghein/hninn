import { stegaClean } from 'next-sanity'

/** True when the href should leave the site (http, https, or www). */
export function isExternalHref(href: string): boolean {
  return /^(https?:\/\/|www\.)/i.test(stegaClean(href).trim())
}

/** True when the href is an in-app path. */
export function isInternalHref(href: string): boolean {
  return stegaClean(href).trim().startsWith('/')
}

/** Prefixed `www.` links with `https://` so browsers resolve them. */
export function normalizeHref(href: string): string {
  const trimmed = stegaClean(href).trim()
  if (/^www\./i.test(trimmed)) return `https://${trimmed}`
  return trimmed
}
