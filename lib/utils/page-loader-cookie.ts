export const PAGE_LOADER_COOKIE = 'hninn_page_loader'
export const PAGE_LOADER_TTL_SECONDS = 10 * 60

function readCookie(name: string) {
  if (typeof document === 'undefined') return null
  const prefix = `${name}=`
  const match = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(prefix))
  return match ? decodeURIComponent(match.slice(prefix.length)) : null
}

/** True when the intro loader ran within the last TTL window. */
export function hasRecentPageLoader(cookieValue?: string | null) {
  return Boolean(cookieValue ?? readCookie(PAGE_LOADER_COOKIE))
}

/** Mark the intro loader as shown for the next TTL window. */
export function markPageLoaderShown() {
  if (typeof document === 'undefined') return
  document.cookie = [
    `${PAGE_LOADER_COOKIE}=1`,
    'path=/',
    `max-age=${PAGE_LOADER_TTL_SECONDS}`,
    'SameSite=Lax',
  ].join('; ')
}
