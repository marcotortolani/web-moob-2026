import type { Metadata } from 'next'
import { type Locale } from '@/i18n/routing'
import { educacionContent } from '@/lib/data/contenido/educacion'
import { generateThemeMetadata, ThemePage } from '@/lib/theme-page'

const SLUG = 'educacion'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  return generateThemeMetadata(SLUG, params)
}

export default async function SomosEducacionPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  return <ThemePage slug={SLUG} content={educacionContent} params={params} />
}
