'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

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
  // El bundle de Three.js pesa ~256KB y su evaluación bloquea el hilo principal
  // ~1s en mobile (el mayor freno del LCP/TBT). Diferimos su montaje hasta que el
  // navegador esté idle tras la carga inicial (post-LCP): hasta entonces se ve el
  // GlobeFallback y, como el globo tiene animación de aparición, no se nota.
  const [mount, setMount] = useState(false)
  useEffect(() => {
    const w = window as typeof window & {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout: number },
      ) => number
      cancelIdleCallback?: (id: number) => void
    }
    // requestIdleCallback no dispara hasta que el hilo principal está libre tras
    // el render crítico, así que el montaje cae naturalmente después del LCP. El
    // timeout es un tope por si nunca hay idle. (Esperar a `window.load` sería
    // demasiado tarde en mobile: ese evento aguarda a los videos pesados.)
    let idleId: number | undefined
    let timeoutId: number | undefined
    if (w.requestIdleCallback) {
      idleId = w.requestIdleCallback(() => setMount(true), { timeout: 2500 })
    } else {
      timeoutId = window.setTimeout(() => setMount(true), 1500)
    }
    return () => {
      if (idleId !== undefined && w.cancelIdleCallback)
        w.cancelIdleCallback(idleId)
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="absolute inset-0 ">
      {mount ? <DottedGlobeClient /> : <GlobeFallback />}
    </div>
  )
}
