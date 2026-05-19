'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { InstagramIcon, LinkedinIcon } from '@/components/ui/social-icons'
import { navLinks } from '@/lib/data/navigation'
import { MapHoverPreview } from '@/components/ui/map-hover-preview'

export function Footer() {
  const pathname = usePathname()
  if (pathname === '/somos-contenido') return null

  return (
    <footer className="bg-black border-t border-white/10 py-10 lg:py-14 px-5 lg:px-16 xl:px-24">
      <div className="max-w-[1728px] mx-auto">
        {/* Mobile: stacked centered, Desktop: horizontal columns */}
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/media-moob-logo-large.webp"
              alt="Media Moob logo"
              width={120}
              height={45}
            />
          </Link>

          {/* Navigation — desktop only */}
          <nav className="hidden lg:flex flex-col gap-2">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
              Navegación
            </p>
            {navLinks.slice(0, 5).map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="text-white/60 text-sm hover:text-mint transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact column — desktop */}
          <div className="hidden lg:flex flex-col gap-2">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
              Contacto
            </p>
            <MapHoverPreview
              href="https://maps.app.goo.gl/cSKNi51Jtf57y7388"
              query="Guatemala 5582, Ciudad de Buenos Aires, Argentina"
              className="text-white/60 text-sm hover:text-mint transition-colors"
              side="top"
              align="start"
            >
              Guatemala 5582, Ciudad de Buenos Aires.
              <br />
              República Argentina.
            </MapHoverPreview>
            <Link
              href="/#contact"
              className="text-mint text-sm hover:underline"
            >
              Hablemos!
            </Link>
            <Link href="/join-us" className="text-mint text-sm hover:underline">
              Trabaja con nosotros
            </Link>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center lg:items-start gap-3">
            <p className="hidden lg:block text-white/40 text-xs uppercase tracking-widest mb-1">
              Redes
            </p>
            <div className=" flex items-center gap-3">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-mint hover:text-white lg:text-white/70 lg:hover:text-mint transition-colors"
              >
                <InstagramIcon size={28} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className=" bg-mint p-px rounded-xs  hover:text-white lg:text-white/70 lg:hover:text-mint transition-colors"
              >
                <LinkedinIcon
                  size={24}
                  className="text-transparent fill-black"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col items-center lg:flex-row lg:justify-between mt-8 pt-6 border-t border-white/5 gap-4">
          {/* Address — mobile only */}
          <a
            href="https://maps.app.goo.gl/cSKNi51Jtf57y7388"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver ubicación en Google Maps"
            className="text-white/80 text-sm text-center lg:hidden hover:text-mint transition-colors"
          >
            Guatemala 5582, Ciudad de Buenos Aires. <br /> República Argentina.
          </a>
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Media Moob. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
