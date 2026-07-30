import type { Metadata } from 'next'
import { Poppins, Bebas_Neue } from 'next/font/google'
import '../[locale]/globals.css'

/**
 * Root layout propio para `/co-tyc`.
 *
 * Esta ruta vive fuera del árbol `[locale]` a propósito: es una página legal
 * de cumplimiento para los servicios de suscripción SMS de Claro Colombia,
 * sin i18n, sin navegación del sitio institucional. Al no existir un
 * `src/app/layout.tsx` compartido, este segmento hermano necesita su propio
 * `<html>`/`<body>` — ver `src/proxy.ts` para la exclusión del matcher.
 */

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

const bebasNeue = Bebas_Neue({
  variable: '--font-bebas-neue',
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function CoTycLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${poppins.variable} ${bebasNeue.variable} antialiased`}>
      <body className="bg-background text-foreground min-h-screen">{children}</body>
    </html>
  )
}
