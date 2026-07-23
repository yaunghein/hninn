'use client'

import { usePathname } from 'next/navigation'
import Footer, { type FooterContent } from '@/components/common/footer'

export default function SiteFooter(props: FooterContent) {
  const pathname = usePathname()
  if (pathname === '/gallery') return null

  return (
    <div className="relative z-20">
      <Footer {...props} />
    </div>
  )
}
