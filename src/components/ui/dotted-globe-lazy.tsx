'use client'

import dynamic from 'next/dynamic'

// Fallback: a simple mint circle that matches the globe's inner area
function GlobeFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[70%] h-[70%] rounded-full border border-mint/20 bg-mint/50" />
    </div>
  )
}

const DottedGlobeClient = dynamic(
  () => import('@/components/ui/dotted-globe').then((mod) => mod.DottedGlobe),
  {
    ssr: false,
    loading: () => <GlobeFallback />,
  },
)

export function LazyDottedGlobe() {
  return (
    <div className="absolute inset-0 ">
      <DottedGlobeClient />
    </div>
  )
}
