'use client'

import { type ComponentProps } from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { InstagramIcon, LinkedinIcon } from '@/components/ui/social-icons'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { navLinks } from '@/lib/data/navigation'
import { socialLinks } from '@/lib/data/social'
import { MapHoverPreview } from '@/components/ui/map-hover-preview'

type LinkHref = ComponentProps<typeof Link>['href']

export function Footer({ version }: { version?: string }) {
  const t = useTranslations('Nav')
  const tf = useTranslations('Footer')
  const pathname = usePathname()
  const year = new Date().getFullYear()
  return (
    <footer
      className={`bg-black border-t border-white/10 py-10 md:py-12 lg:py-14 px-5 md:px-8 lg:px-16 xl:px-24 ${pathname === '/somos-contenido' ? 'hidden lg:block' : ''}`}
    >
      <div className="max-w-[1528px] mx-auto">
        {/* Mobile: stacked centered, Desktop: horizontal columns */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between md:gap-8 lg:gap-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/media-moob-logo-large.webp"
              alt="Media Moob logo"
              width={120}
              height={45}
            />
          </Link>

          {/* Navigation — tablet+ */}
          <nav className="hidden md:flex flex-col gap-2">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
              {tf('Navigation')}
            </p>
            {navLinks.slice(0, 5).map((link) => (
              <Link
                key={link.href + link.key}
                href={link.href as LinkHref}
                className="text-white/60 text-sm hover:text-mint transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          {/* Contact column — tablet+ */}
          <div className="hidden md:flex flex-col gap-2">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
              {tf('Contact')}
            </p>
            <MapHoverPreview
              href="https://maps.app.goo.gl/cSKNi51Jtf57y7388"
              query="Guatemala 5582, Ciudad de Buenos Aires, Argentina"
              className="text-white/60 text-sm hover:text-mint transition-colors"
              side="top"
              align="start"
            >
              {tf('address')}
            </MapHoverPreview>
            <NextLink
              href="/#contact"
              className="text-mint text-sm hover:underline"
            >
              {tf("Let's talk!")}
            </NextLink>
            <Link
              href="/join-us"
              className="text-mint text-sm hover:underline"
            >
              {tf('Work with us')}
            </Link>
          </div>

          {/* Social + Language */}
          <div className="flex flex-col items-center lg:items-start gap-3">
            <p className="hidden md:block text-white/40 text-xs uppercase tracking-widest mb-1">
              {tf('Networks')}
            </p>
            <div className=" flex items-center gap-3">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className=" text-mint hover:text-white lg:text-white/70 lg:hover:text-mint hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <InstagramIcon size={28} />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className=" bg-mint p-px rounded-xs  hover:text-white lg:text-white/70 lg:hover:text-mint hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <LinkedinIcon
                  size={24}
                  className="text-transparent fill-black"
                />
              </a>
            </div>
            <div className="mt-4">
              <LanguageSwitcher align="start" />
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col items-center md:flex-row md:justify-between mt-8 pt-6 border-t border-white/5 gap-4">
          {/* Address — mobile only */}
          <a
            href="https://maps.app.goo.gl/cSKNi51Jtf57y7388"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Maps"
            className="text-white/80 text-sm text-center md:hidden hover:text-mint transition-colors"
          >
            {tf('address')}
          </a>
          <p className="text-white/40 text-xs">{tf('rights', { year })}</p>
          {version && (
            <p className="text-white/20 text-xs">v{version}</p>
          )}
        </div>
      </div>
    </footer>
  )
}
