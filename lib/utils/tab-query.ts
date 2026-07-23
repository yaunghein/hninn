export const TAB_QUERY_KEY = 'tab'
export const DEFAULT_TAB_ID = 'all'

/** Resolve a tab id from searchParams against the known tab list. */
export function resolveTabId(
  raw: string | string[] | undefined,
  validIds: string[],
  fallback: string = DEFAULT_TAB_ID,
): string {
  const value = Array.isArray(raw) ? raw[0] : raw
  if (value && validIds.includes(value)) return value
  return fallback
}
