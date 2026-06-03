import type { Metadata } from 'next'
import { type Locale } from '@/i18n/routing'
import { viajesContent } from '@/lib/data/contenido/viajes'
import { generateThemeMetadata, ThemePage } from '@/lib/theme-page'

const SLUG = 'viajes'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  return generateThemeMetadata(SLUG, params)
}

export default async function SomosViajesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  return <ThemePage slug={SLUG} content={viajesContent} params={params} />
}
