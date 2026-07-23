/** Lowercase URL-safe slug from a display label. */
export function slugify(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Slugify and ensure uniqueness within `used`. */
export function uniqueSlug(value: string, used: Set<string>): string {
  const base = slugify(value) || 'tab'
  let slug = base
  let n = 2

  while (used.has(slug)) {
    slug = `${base}-${n}`
    n += 1
  }

  used.add(slug)
  return slug
}
