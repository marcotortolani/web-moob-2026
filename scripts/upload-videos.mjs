import { put } from '@vercel/blob'
import { readFileSync, existsSync } from 'fs'
import { basename } from 'path'

const videos = [
  'public/videos/reel-es-argentino.mp4',
  'public/videos/reel-en.mp4',
  'public/videos/reel-pt.mp4',
]

for (const filePath of videos) {
  if (!existsSync(filePath)) {
    console.log(`⚠️  No encontrado, saltando: ${filePath}`)
    continue
  }

  const name = basename(filePath)
  console.log(`Subiendo ${name}...`)

  const blob = await put(`videos/${name}`, readFileSync(filePath), {
    access: 'public',
    contentType: 'video/mp4',
    token: process.env.BLOB_READ_WRITE_TOKEN,
    allowOverwrite: true,
  })

  console.log(`✅ ${name}`)
  console.log(`   URL: ${blob.url}\n`)
}
