'use client'

import { useState, useEffect, type ComponentProps } from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { Link, usePathname } from '@/i18n/navigation'
import { InstagramIcon, LinkedinIcon } from '@/components/ui/social-icons'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { navLinks } from '@/lib/data/navigation'
import { cn } from '@/lib/utils'

type LinkHref = ComponentProps<typeof Link>['href']

/**
 * `pathname` viene de `usePathname` de next-intl => ruta INTERNA canónica
 * (`/somos-contenido`), sin prefijo de idioma ni slug traducida. Por eso se
 * compara directo contra los `href` de `navLinks`, sirviendo para los 3 idiomas.
 */
function isActiveLink(pathname: string, href: string) {
  if (href.includes('#')) return false
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

export function Header() {
  const t = useTranslations('Nav')
  const tHeader = useTranslations('Header')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [prevPathname, setPrevPathname] = useState(pathname)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    setMenuOpen(false)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-200 ease-in-out bg-linear-to-b',
          scrolled
            ? 'from-black via-black/80 to-black/50 backdrop-blur-sm backdrop-brightness-50 border-b-white/20 border-b'
            : 'from-black/80 via-black/40 to-transparent',
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 max-w-[1728px] mx-auto">
          <MediaMoobLogo alt={tHeader('Media Moob logo')} />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 lg:gap-7">
            <AnimatePresence mode="popLayout" initial={false}>
              {pathname !== '/' && (
                <motion.div
                  layout="position"
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <Link
                    href="/"
                    className="text-sm font-medium transition-colors hover:text-mint text-white/80"
                  >
                    {t('Home')}
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
            {navLinks.map((link) => {
              const active = isActiveLink(pathname, link.href)
              const className = cn(
                'relative z-10 text-sm font-medium transition-colors hover:text-mint',
                'highlight' in link && link.highlight
                  ? 'text-mint font-semibold'
                  : active
                    ? 'text-mint'
                    : 'text-white/80',
              )
              return (
                <motion.div
                  layout="position"
                  key={link.href + link.key}
                  className="relative"
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute -inset-x-3 -inset-y-1.5 rounded-full bg-mint/15"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  {link.href.includes('#') ? (
                    <NextLink href={link.href} className={className}>
                      {t(link.key)}
                    </NextLink>
                  ) : (
                    <Link href={link.href as LinkHref} className={className}>
                      {t(link.key)}
                    </Link>
                  )}
                </motion.div>
              )
            })}
          </nav>

          {/* Mobile Nav */}
          <div className=" flex gap-6 items-center">
            {/* Desktop Social Icons */}
            <div className=" flex items-center gap-4">
              <a
                href="https://www.instagram.com/mediamoob/"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-mint hover:text-white lg:text-white/80 lg:hover:text-mint transition-colors duration-300 ease-in-out"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/media-moob/"
                target="_blank"
                rel="noopener noreferrer"
                className=" bg-mint p-px rounded-xs  hover:text-white lg:bg-white/80 lg:hover:bg-mint transition-colors duration-300 ease-in-out"
              >
                <LinkedinIcon
                  size={18}
                  className="text-transparent fill-black"
                />
              </a>
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-mint p-1"
              aria-label={tHeader('Open menu')}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </>
  )
}

function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean
  onClose: () => void
  pathname: string
}) {
  const t = useTranslations('Nav')
  const tHeader = useTranslations('Header')
  const links =
    pathname === '/' ? navLinks : [{ key: 'Home', href: '/' }, ...navLinks]
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-[1000] bg-black flex flex-col px-5 min-[375px]:px-8 pt-8 pb-12"
        >
          <div className="flex justify-between items-center mb-12">
            <MediaMoobLogo alt={tHeader('Media Moob logo')} />
            <button
              onClick={onClose}
              className="text-white"
              aria-label={tHeader('Close menu')}
            >
              <X size={28} />
            </button>
          </div>

          <nav className="flex flex-col gap-6 flex-1">
            {links.map((link, i) => {
              const active = isActiveLink(pathname, link.href)
              const className = cn(
                'relative z-10 text-2xl font-bold transition-colors',
                'highlight' in link && link.highlight
                  ? 'text-mint'
                  : active
                    ? 'text-mint'
                    : 'text-white hover:text-mint',
              )
              return (
                <motion.div
                  key={link.href + link.key}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <span className="relative inline-block">
                    {active && (
                      <motion.span
                        layoutId="nav-pill-mobile"
                        className="absolute -inset-x-4 -inset-y-1.5 rounded-full bg-mint/15"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    {link.href.includes('#') ? (
                      <NextLink
                        href={link.href}
                        onClick={onClose}
                        className={className}
                      >
                        {t(link.key)}
                      </NextLink>
                    ) : (
                      <Link
                        href={link.href as LinkHref}
                        onClick={onClose}
                        className={className}
                      >
                        {t(link.key)}
                      </Link>
                    )}
                  </span>
                </motion.div>
              )
            })}
          </nav>

          {/* Language switcher — dentro del sidebar, debajo de la nav */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: links.length * 0.06 }}
            className="mt-6"
          >
            <LanguageSwitcher />
          </motion.div>

          <div className="flex gap-4 mt-6">
            <a
              href="https://www.instagram.com/mediamoob/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-mint"
            >
              <InstagramIcon size={22} />
            </a>
            <a
              href="https://www.linkedin.com/company/media-moob/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-mint"
            >
              <LinkedinIcon size={22} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function MediaMoobLogo({ alt }: { alt: string }) {
  return (
    <Link href="/">
      <Image
        src="/images/media-moob-logo-small.webp"
        alt={alt}
        width={90}
        height={34}
        priority
      />
    </Link>
  )
}
