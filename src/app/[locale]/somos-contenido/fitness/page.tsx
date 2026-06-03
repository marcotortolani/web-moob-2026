import type { Metadata } from 'next'
import { type Locale } from '@/i18n/routing'
import { fitnessContent } from '@/lib/data/contenido/fitness'
import { generateThemeMetadata, ThemePage } from '@/lib/theme-page'

const SLUG = 'fitness'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  return generateThemeMetadata(SLUG, params)
}

export default async function SomosFitnessPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  return <ThemePage slug={SLUG} content={fitnessContent} params={params} />
}
