import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'
import type { Locale } from '@/i18n/routing'
import esMessages from '../../../messages/es.json'
import enMessages from '../../../messages/en.json'
import ptMessages from '../../../messages/pt.json'

export const alt = 'Media Moob'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const descriptions: Record<string, string> = {
  es: esMessages.Metadata.siteDescription,
  en: enMessages.Metadata.siteDescription,
  pt: ptMessages.Metadata.siteDescription,
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const description = descriptions[locale] ?? descriptions.es

  const logoData = readFileSync(join(process.cwd(), 'public/logo-moob.jpg'))
  const logoSrc = `data:image/jpeg;base64,${logoData.toString('base64')}`

  const bebasFont = readFileSync(
    join(
      process.cwd(),
      'node_modules/@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff',
    ),
  )

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          width: '100%',
          height: '100%',
          background: '#000000',
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        {/* Mint accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '6px',
            background: '#40b09d',
          }}
        />

        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-160px',
            right: '-160px',
            width: '540px',
            height: '540px',
            borderRadius: '50%',
            border: '1px solid rgba(64,176,157,0.15)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            border: '1px solid rgba(64,176,157,0.25)',
            display: 'flex',
          }}
        />

        {/* Logo + wordmark + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Logo + wordmark in same row */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '32px' }}>
            <img
              src={logoSrc}
              alt="Media Moob"
              width={110}
              height={110}
              style={{ objectFit: 'contain' }}
            />
            <div
              style={{
                display: 'flex',
                fontSize: '116px',
                fontFamily: 'Bebas Neue',
                fontWeight: 400,
                letterSpacing: '2px',
                lineHeight: 1,
              }}
            >
              <span style={{ color: '#ffffff' }}>MEDIA&nbsp;</span>
              <span style={{ color: '#40b09d' }}>MOOB</span>
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              display: 'flex',
              fontSize: '26px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.4,
              maxWidth: '720px',
            }}
          >
            {description}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Bebas Neue',
          data: bebasFont,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  )
}
