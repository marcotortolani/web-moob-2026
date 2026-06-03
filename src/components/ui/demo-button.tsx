import { type ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { Link } from '@/i18n/navigation'

type LinkHref = ComponentProps<typeof Link>['href']

interface DemoButtonProps {
  href?: string
  target?: string
  className?: string
  children?: React.ReactNode
}

export function DemoButton({
  href,
  target = '_self',
  className,
  children = 'VER DEMO',
}: DemoButtonProps) {
  const base =
    'inline-flex items-center justify-center bg-mint text-black font-display text-xl lg:text-2xl tracking-wider px-4 py-2 rounded-full hover:scale-105 hover:bg-mint/90 transition-all duration-300 ease-in-out'

  if (href) {
    // Rutas internas -> Link de next-intl (URL localizada). Hash/externas -> <a>.
    const isInternal = href.startsWith('/') && !href.includes('#')
    if (isInternal) {
      return (
        <Link href={href as LinkHref} className={cn(base, className)}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} target={target} className={cn(base, className)}>
        {children}
      </a>
    )
  }

  return <button className={cn(base, className)}>{children}</button>
}
