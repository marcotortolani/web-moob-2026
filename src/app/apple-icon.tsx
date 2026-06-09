import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// Loaded once per function instance
const logoData = readFileSync(join(process.cwd(), 'public/logo-moob.jpg'))
const logoSrc = `data:image/jpeg;base64,${logoData.toString('base64')}`

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000000',
          borderRadius: '22px',
        }}
      >
        {/* Mint accent bar at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: '#40b09d',
            display: 'flex',
          }}
        />
        {/* Logo symbol — centered, scaled */}
        <img
          src={logoSrc}
          alt="Media Moob"
          width={110}
          height={110}
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    { ...size },
  )
}
