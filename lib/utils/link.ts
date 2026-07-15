/** True when the href should leave the site (http, https, or www). */
export function isExternalHref(href: string): boolean {
  return /^(https?:\/\/|www\.)/i.test(href.trim())
}

/** True when the href is an in-app path. */
export function isInternalHref(href: string): boolean {
  return href.trim().startsWith('/')
}

/** Prefixed `www.` links with `https://` so browsers resolve them. */
export function normalizeHref(href: string): string {
  const trimmed = href.trim()
  if (/^www\./i.test(trimmed)) return `https://${trimmed}`
  return trimmed
}
