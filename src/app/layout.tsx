import type { Metadata } from 'next'
import { Geist_Mono, Poppins, Bebas_Neue } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Toaster } from '@/components/ui/sonner'

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

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mediamoob.com'),
  title: 'Media Moob — Contenido, Tecnología y Experiencias',
  description:
    'Somos creativos, somos curiosos, somos Media Moob. Contenido, tecnología y experiencias en más de 30 países.',
  keywords: [
    'Media Moob',
    'contenido digital',
    'música',
    'tecnología móvil',
    'activaciones',
    'juegos',
    'gamificación',
    'Latinoamérica',
    'África',
  ],
  authors: [{ name: 'Media Moob' }],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://mediamoob.com',
    siteName: 'Media Moob',
    title: 'Media Moob — Contenido, Tecnología y Experiencias',
    description:
      'Somos creativos, somos curiosos, somos Media Moob. Contenido, tecnología y experiencias en más de 30 países.',
    images: [
      { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Media Moob' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Media Moob — Contenido, Tecnología y Experiencias',
    description:
      'Somos creativos, somos curiosos, somos Media Moob. Contenido, tecnología y experiencias en más de 30 países.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${bebasNeue.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <Header />
        {children}
        <Footer />
        <Toaster theme="dark" position="bottom-right" richColors />
      </body>
    </html>
  )
}
