import type { Metadata } from 'next'
import { type Locale } from '@/i18n/routing'
import { cocinaContent } from '@/lib/data/contenido/cocina'
import { generateThemeMetadata, ThemePage } from '@/lib/theme-page'

const SLUG = 'cocina'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  return generateThemeMetadata(SLUG, params)
}

export default async function SomosCocinaPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  return <ThemePage slug={SLUG} content={cocinaContent} params={params} />
}
