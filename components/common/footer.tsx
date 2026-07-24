import AppLink from '@/components/common/app-link'
import { Logo, Pattern } from '@/components/svgs'
import { cn } from '@/lib/utils/cn'

export type FooterLink = {
  label: string
  href: string
}

export type FooterContent = {
  social: FooterLink[]
  delivery: FooterLink[]
  petPolicy: FooterLink
  address: string
  hours: string
  legal: FooterLink[]
}

type FooterProps = FooterContent

function FooterNavLink({
  label,
  href,
  className,
}: FooterLink & { className?: string }) {
  return (
    <AppLink
      href={href}
      className={cn('transition-opacity hover:opacity-70', className)}
    >
      {label}
    </AppLink>
  )
}

export default function Footer({
  social,
  delivery,
  petPolicy,
  address,
  hours,
  legal,
}: FooterProps) {
  const [terms, privacy] = legal
  const copyright = `© ${new Date().getFullYear()} Hninn. All rights reserved.`

  return (
    <footer className="bg-peach-light text-brown-muted">
      <div className="overflow-hidden pt-13 xs:pt-23">
        <Pattern
          color="brown-muted"
          opacity={0.2}
          className="w-[345vw] xs:w-[175vw] translate-x-[-1.4rem]"
        />
      </div>

      <div className="grid grid-cols-1 gap-x-3 px-6 pb-22 xs:pb-24 text-sm leading-[1.39] xs:grid-cols-8 pt-13">
        <div className="col-span-full grid grid-cols-3 gap-x-3 xs:grid-cols-8">
          <nav
            className="flex flex-col gap-1 xs:col-span-2 xs:col-start-3 xs:gap-2"
            aria-label="Social"
          >
            {social.map((link) => (
              <FooterNavLink key={`${link.label}-${link.href}`} {...link} />
            ))}
          </nav>

          <nav
            className="flex flex-col gap-1 translate-x-6 xs:col-span-2 xs:col-start-6 xs:translate-x-0 xs:gap-2"
            aria-label="Delivery"
          >
            {delivery.map((link) => (
              <FooterNavLink key={`${link.label}-${link.href}`} {...link} />
            ))}
          </nav>

          <nav
            className="justify-self-end xs:col-start-8"
            aria-label="Pet policy"
          >
            <FooterNavLink {...petPolicy} />
          </nav>
        </div>

        <p className="mt-13 max-w-45 xs:max-w-62 leading-[1.4] xs:col-span-2 xs:col-start-3 xs:mt-13">
          {address}
        </p>
        <p className="mt-6 max-w-44.5 whitespace-pre-line leading-[1.4] xs:col-span-2 xs:col-start-6 xs:mt-13">
          {hours}
        </p>

        <nav
          className="mt-13 flex justify-between xs:mt-0 xs:contents"
          aria-label="Legal"
        >
          {terms && (
            <FooterNavLink {...terms} className="xs:col-start-3 xs:mt-6" />
          )}
          {privacy && (
            <FooterNavLink {...privacy} className="xs:col-start-6 xs:mt-6" />
          )}
        </nav>

        <div className="col-span-full mt-4 flex flex-col gap-3 xs:mt-23">
          <Logo color="brown-muted" className="w-full" />
          <p className="mb-1 text-left xs:mb-0 xs:text-center">{copyright}</p>
        </div>
      </div>
    </footer>
  )
}
