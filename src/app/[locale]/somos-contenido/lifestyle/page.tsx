import type { Metadata } from 'next'
import { type Locale } from '@/i18n/routing'
import { lifestyleContent } from '@/lib/data/contenido/lifestyle'
import { generateThemeMetadata, ThemePage } from '@/lib/theme-page'

const SLUG = 'lifestyle'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  return generateThemeMetadata(SLUG, params)
}

export default async function SomosLifestylePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  return <ThemePage slug={SLUG} content={lifestyleContent} params={params} />
}
