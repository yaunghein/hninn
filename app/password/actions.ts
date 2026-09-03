'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { PASSWORD_COOKIE_NAME } from '@/lib/constants/password-gate'

const THIRTY_DAYS_IN_SECONDS = 60 * 60 * 24 * 30

export async function unlockSite(formData: FormData) {
  const expectedPassword = process.env.PASSWORD
  const password = formData.get('password')

  if (
    !expectedPassword ||
    typeof password !== 'string' ||
    password !== expectedPassword
  ) {
    redirect('/password?invalid=1')
  }

  const cookieStore = await cookies()
  cookieStore.set(PASSWORD_COOKIE_NAME, '1', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: THIRTY_DAYS_IN_SECONDS,
  })

  redirect('/')
}
