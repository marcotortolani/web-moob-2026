import { JoinUsSection } from '@/components/sections/join-us/join-us-section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sumate | Media Moob',
  description: 'Postulate para trabajar con nosotros.',
}

export default function JoinUsPage() {
  return <JoinUsSection />
}
