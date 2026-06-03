'use client'

import { useState, useRef, useEffect, useTransition } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { cn } from '@/lib/utils'

const LOCALE_LABELS: Record<Locale, { name: string; short: string }> = {
  es: { name: 'Español', short: 'ES' },
  en: { name: 'English', short: 'EN' },
  pt: { name: 'Português', short: 'PT' },
}

export function LanguageSwitcher({
  className,
  align = 'start',
}: {
  className?: string
  align?: 'start' | 'end'
}) {
  const t = useTranslations('LanguageSwitcher')
  const activeLocale = useLocale() as Locale
  const pathname = usePathname()
  const params = useParams()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  function changeLocale(next: Locale) {
    setOpen(false)
    if (next === activeLocale) return
    startTransition(() => {
      // Patrón oficial de next-intl: preserva la ruta actual (incl. params
      // dinámicos) y genera la URL traducida con prefijo del nuevo idioma.
      router.replace(
        // @ts-expect-error -- pathname + params dinámicos son compatibles en runtime
        { pathname, params },
        { locale: next },
      )
    })
  }

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        aria-label={t('Select language')}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          'flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5',
          'text-sm font-medium text-white/80 transition-colors',
          'hover:border-mint hover:text-mint focus-visible:outline-none focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint/40',
          isPending && 'opacity-60',
        )}
      >
        <Globe size={16} className="shrink-0" />
        <span className="font-display tracking-widest">
          {LOCALE_LABELS[activeLocale].short}
        </span>
        <ChevronDown
          size={14}
          className={cn('transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className={cn(
            'absolute bottom-full mb-2 z-50 min-w-40 overflow-hidden rounded-lg border border-white/10 bg-surface shadow-xl',
            align === 'end' ? 'right-0' : 'left-0',
          )}
        >
          {routing.locales.map((locale) => {
            const isActive = locale === activeLocale
            return (
              <li key={locale}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => changeLocale(locale)}
                  className={cn(
                    'flex w-full items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors',
                    isActive
                      ? 'text-mint'
                      : 'text-white/70 hover:bg-white/5 hover:text-white',
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span className="font-display tracking-widest text-xs text-white/40 w-6">
                      {LOCALE_LABELS[locale].short}
                    </span>
                    {LOCALE_LABELS[locale].name}
                  </span>
                  {isActive && <Check size={15} className="text-mint" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
