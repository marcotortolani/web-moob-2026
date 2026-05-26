'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, Ellipsis } from 'lucide-react'
import { InstagramIcon, LinkedinIcon } from '@/components/ui/social-icons'
import { navLinks } from '@/lib/data/navigation'
import { cn } from '@/lib/utils'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isContenidoHub = pathname === '/somos-contenido'

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

  if (isContenidoHub) {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 z-[100]">
          <div className="flex items-center justify-between px-5 py-4 max-w-[1728px] mx-auto">
            <MediaMoobLogo />
            <button
              onClick={() => setMenuOpen(true)}
              className="text-mint p-1"
              aria-label="Abrir menú"
            >
              <Ellipsis size={26} />
            </button>
          </div>
        </header>
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </>
    )
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
          <MediaMoobLogo />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 lg:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-mint',
                  'highlight' in link && link.highlight
                    ? 'text-mint font-semibold'
                    : 'text-white/80',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Nav */}
          <div className=" flex gap-6 items-center">
            {/* Desktop Social Icons */}
            <div className=" flex items-center gap-4">
              <Link
                href="https://www.instagram.com/mediamoob/"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-mint hover:text-white lg:text-white/70 lg:hover:text-mint transition-colors"
              >
                <InstagramIcon size={18} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/media-moob/"
                target="_blank"
                rel="noopener noreferrer"
                className=" bg-mint p-px rounded-xs  hover:text-white lg:text-white/70 lg:hover:text-mint transition-colors"
              >
                <LinkedinIcon
                  size={18}
                  className="text-transparent fill-black"
                />
              </Link>
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-mint p-1"
              aria-label="Abrir menú"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-[1000] bg-black flex flex-col px-8 pt-8 pb-12"
        >
          <div className="flex justify-between items-center mb-12">
            <MediaMoobLogo />
            <button
              onClick={onClose}
              className="text-white"
              aria-label="Cerrar menú"
            >
              <X size={28} />
            </button>
          </div>

          <nav className="flex flex-col gap-6 flex-1">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href + link.label}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    'text-2xl font-bold transition-colors',
                    'highlight' in link && link.highlight
                      ? 'text-mint'
                      : 'text-white hover:text-mint',
                  )}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex gap-4 mt-auto">
            <Link
              href="https://www.instagram.com/mediamoob/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-mint"
            >
              <InstagramIcon size={22} />
            </Link>
            <Link
              href="https://www.linkedin.com/company/media-moob/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-mint"
            >
              <LinkedinIcon size={22} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function MediaMoobLogo() {
  return (
    <Link href="/">
      <Image
        src="/images/media-moob-logo-small.webp"
        alt="Media Moob logo"
        width={90}
        height={34}
        priority
      />
    </Link>
  )
}
