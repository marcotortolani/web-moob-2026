'use client'

import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'motion/react'

type Props = {
  href: string
  query: string
  children: ReactNode
  className?: string
  side?: 'top' | 'bottom'
  align?: 'start' | 'center'
}

export function MapHoverPreview({
  href,
  query,
  children,
  className,
  side = 'top',
  align = 'start',
}: Props) {
  const [open, setOpen] = useState(false)
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
  const sideClass = side === 'top' ? 'bottom-full mb-3' : 'top-full mt-3'
  const alignClass = align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0'

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: side === 'top' ? 6 : -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: side === 'top' ? 6 : -6 }}
            transition={{ duration: 0.15 }}
            className={`pointer-events-none absolute ${sideClass} ${alignClass} z-50 w-[320px] overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl`}
          >
            <iframe
              src={embedSrc}
              width="320"
              height="200"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, display: 'block' }}
              title="Mini mapa de la ubicación"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
