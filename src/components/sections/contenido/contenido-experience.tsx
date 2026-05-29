'use client'

import { useState, useEffect } from 'react'
import { ContenidoReels } from './contenido-reels'
import { ContenidoHero } from './contenido-hero'

export function ContenidoExperience() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Evita flash y mismatch de hidratación
  if (isDesktop === null) {
    return <div className="h-dvh w-full bg-black" />
  }

  return isDesktop ? <ContenidoHero /> : <ContenidoReels />
}
