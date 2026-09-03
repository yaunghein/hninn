import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { PASSWORD_COOKIE_NAME } from '@/lib/constants/password-gate'

import { unlockSite } from './actions'

type PasswordPageProps = {
  searchParams: Promise<{
    invalid?: string
  }>
}

export default async function PasswordPage({
  searchParams,
}: PasswordPageProps) {
  const cookieStore = await cookies()
  const hasAccess = cookieStore.has(PASSWORD_COOKIE_NAME)

  if (hasAccess) {
    redirect('/')
  }

  const query = await searchParams
  const showError = query.invalid === '1'

  return (
    <main className="flex min-h-dvh items-center justify-center bg-cream px-6 py-16 xs:py-24">
      <section
        className="w-full max-w-2xl py-10 text-center xs:py-14"
        aria-labelledby="password-heading"
      >
        <form
          action={unlockSite}
          className="mx-auto mt-8 flex w-full max-w-md flex-col gap-4"
        >
          <label
            htmlFor="password"
            className="text-left text-xs font-bold uppercase leading-[1.6] tracking-[0.02em] text-olive xs:text-sm"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="h-12 rounded-full border border-olive/35 bg-transparent px-5 text-base text-brown outline-none ring-olive/25 transition focus:ring-2"
          />

          {showError ? (
            <p className="text-left text-xs leading-[1.39] text-red-600 xs:text-sm">
              Invalid password. Please try again.
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-1 inline-flex h-12 items-center justify-center rounded-full bg-olive px-6 text-sm font-bold uppercase leading-[1.6] tracking-[0.02em] text-cream transition hover:opacity-90 xs:text-base"
          >
            Continue
          </button>
        </form>
      </section>
    </main>
  )
}
