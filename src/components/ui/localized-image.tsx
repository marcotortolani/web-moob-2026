'use client'

import Image, { type ImageProps } from 'next/image'
import { useLocale } from 'next-intl'
import {
  resolveLocalizedImage,
  type LocalizedImageKey,
} from '@/lib/i18n/localized-images'

type LocalizedImageProps = Omit<ImageProps, 'src'> & {
  imageKey: LocalizedImageKey
  /** Forzar un idioma (server components). Por defecto usa el locale activo. */
  locale?: string
}

/**
 * `next/image` cuyo `src` se resuelve según el idioma activo, con fallback
 * (ver `resolveLocalizedImage`). Si falta la variante de un idioma, cae al default.
 */
export function LocalizedImage({
  imageKey,
  locale: localeProp,
  alt,
  ...props
}: LocalizedImageProps) {
  const activeLocale = useLocale()
  const locale = localeProp ?? activeLocale
  return <Image src={resolveLocalizedImage(imageKey, locale)} alt={alt} {...props} />
}
