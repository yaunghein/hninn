import type { NavbarContent, NavbarLink } from '@/components/common/navbar'
import type { FooterContent, FooterLink } from '@/components/common/footer'
import { stegaClean } from 'next-sanity'

type SanityLink = {
  label?: string | null
  href?: string | null
} | null

export type NavbarData = {
  hours?: {
    line1?: string | null
    line2?: string | null
  } | null
  gallery?: SanityLink
  reservation?: SanityLink
  menuLinks?: SanityLink[] | null
} | null

export type FooterData = {
  social?: SanityLink[] | null
  delivery?: SanityLink[] | null
  petPolicy?: SanityLink
  address?: string | null
  hours?: string | null
  legal?: SanityLink[] | null
} | null

const FALLBACK_NAVBAR: NavbarContent = {
  hours: ['Open 7:00 - 23:00', 'closed on wed'],
  gallery: { label: 'gallery', href: '/gallery' },
  reservation: { label: 'Make a reservation', href: '/reservation' },
  menuLinks: [
    { label: 'Menu', href: '/menu' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Concept', href: '/concept' },
    { label: 'host an event', href: '/events' },
    { label: 'getting here', href: '/getting-here' },
    { label: 'contact', href: '/contact' },
  ],
}

const FALLBACK_FOOTER: FooterContent = {
  social: [
    { label: 'Line OA', href: 'https://line.me' },
    { label: 'Tiktok', href: 'https://tiktok.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
  ],
  delivery: [
    { label: 'Grab', href: 'https://grab.com' },
    { label: 'Line Man', href: 'https://lineman.line.me' },
  ],
  petPolicy: { label: 'Pet Policy', href: '/pet-policy' },
  address: '1980 Phetchaburi Rd, Bang Kapi, Huai Khwang, Bangkok 10310',
  hours: '7:00 AM – 9:00 PM\n(Closed Wednesdays)',
  legal: [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
}

function mapLink(
  link: SanityLink | undefined,
  fallback: NavbarLink | FooterLink,
): NavbarLink | FooterLink {
  return {
    label: link?.label ?? fallback.label,
    href: stegaClean(link?.href ?? fallback.href),
  }
}

function mapLinks(
  links: SanityLink[] | null | undefined,
  fallback: Array<NavbarLink | FooterLink>,
): Array<NavbarLink | FooterLink> {
  const mapped = (links ?? [])
    .filter((link): link is { label: string; href: string } =>
      Boolean(link?.label && link?.href),
    )
    .map((link, index) =>
      mapLink(link, fallback[index] ?? { label: link.label, href: link.href }),
    )

  return mapped.length > 0 ? mapped : fallback
}

export function toNavbarContent(data: NavbarData): NavbarContent {
  if (!data) return FALLBACK_NAVBAR

  return {
    hours: [
      data.hours?.line1 ?? FALLBACK_NAVBAR.hours[0],
      data.hours?.line2 ?? FALLBACK_NAVBAR.hours[1],
    ],
    gallery: mapLink(data.gallery, FALLBACK_NAVBAR.gallery),
    reservation: mapLink(data.reservation, FALLBACK_NAVBAR.reservation),
    menuLinks: mapLinks(data.menuLinks, FALLBACK_NAVBAR.menuLinks) as NavbarLink[],
  }
}

export function toFooterContent(data: FooterData): FooterContent {
  if (!data) return FALLBACK_FOOTER

  return {
    social: mapLinks(data.social, FALLBACK_FOOTER.social) as FooterLink[],
    delivery: mapLinks(data.delivery, FALLBACK_FOOTER.delivery) as FooterLink[],
    petPolicy: mapLink(
      data.petPolicy,
      FALLBACK_FOOTER.petPolicy,
    ) as FooterLink,
    address: data.address ?? FALLBACK_FOOTER.address,
    hours: data.hours ?? FALLBACK_FOOTER.hours,
    legal: mapLinks(data.legal, FALLBACK_FOOTER.legal) as FooterLink[],
  }
}
