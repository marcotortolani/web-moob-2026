import type { Metadata } from 'next'
import { type Locale } from '@/i18n/routing'
import { gamingContent } from '@/lib/data/contenido/gaming'
import { generateThemeMetadata, ThemePage } from '@/lib/theme-page'

const SLUG = 'gaming'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  return generateThemeMetadata(SLUG, params)
}

export default async function SomosGamingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  return <ThemePage slug={SLUG} content={gamingContent} params={params} />
}
