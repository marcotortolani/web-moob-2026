import type { Metadata } from 'next'
import { Geist_Mono, Poppins, Bebas_Neue } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import './globals.css'
import { routing, type Locale } from '@/i18n/routing'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Toaster } from '@/components/ui/sonner'
import { JsonLd } from '@/components/seo/json-ld'
import { SITE_URL, getAlternates } from '@/lib/seo'
import { version } from '../../../package.json'

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

const OG_LOCALE: Record<Locale, string> = {
  es: 'es_AR',
  en: 'en_US',
  pt: 'pt_BR',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  const title = t('siteTitle')
  const description = t('siteDescription')

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
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
    alternates: getAlternates('/', locale),
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[locale],
      url: SITE_URL,
      siteName: 'Media Moob',
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: { index: true, follow: true },
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${bebasNeue.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <JsonLd locale={locale} />
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer version={version} />
          <Toaster theme="dark" position="bottom-right" richColors />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
