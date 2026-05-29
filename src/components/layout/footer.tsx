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
    <footer className="bg-black border-t border-white/10 py-10 md:py-12 lg:py-14 px-5 md:px-8 lg:px-16 xl:px-24">
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

          {/* Contact column — tablet+ */}
          <div className="hidden md:flex flex-col gap-2">
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
            <p className="hidden md:block text-white/40 text-xs uppercase tracking-widest mb-1">
              Redes
            </p>
            <div className=" flex items-center gap-3">
              <Link
                href="https://www.instagram.com/mediamoob/"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-mint hover:text-white lg:text-white/70 lg:hover:text-mint hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <InstagramIcon size={28} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/media-moob/"
                target="_blank"
                rel="noopener noreferrer"
                className=" bg-mint p-px rounded-xs  hover:text-white lg:text-white/70 lg:hover:text-mint hover:scale-105 transition-all duration-300 ease-in-out"
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
        <div className="flex flex-col items-center md:flex-row md:justify-between mt-8 pt-6 border-t border-white/5 gap-4">
          {/* Address — mobile only */}
          <a
            href="https://maps.app.goo.gl/cSKNi51Jtf57y7388"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver ubicación en Google Maps"
            className="text-white/80 text-sm text-center md:hidden hover:text-mint transition-colors"
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
