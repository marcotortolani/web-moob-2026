'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useAnimate, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

type VideoPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

interface GridProps {
  items: {
    video: string
    videoFrame: string
    imageH: string | string[]
    imageV: string | string[]
  }
  videoPosition: VideoPosition
  /** Solo true para el banner cercano al fold; el resto carga lazy (evita
   *  que ~6 imágenes de grids bajo el fold compitan con el LCP del hero). */
  priority?: boolean
  extraItems?: {
    imageH: string
    imageSquare: string
  }
}

// ─── Flip image panel ────────────────────────────────────────────────────────

const FLIP_MS = 700

interface SplitFlapProps {
  images: string[]
  alt: string
  sizes: string
  flip: boolean
  onFlipDone: () => void
  placeholder: React.ReactNode
  axis?: 'x' | 'y'
  priority?: boolean
}

function SplitFlapImage({
  images,
  alt,
  sizes,
  flip,
  onFlipDone,
  placeholder,
  axis = 'x',
  priority = false,
}: SplitFlapProps) {
  const prefersReduced = useReducedMotion()
  const idxRef         = useRef(0)
  const lockRef        = useRef(false)
  const [scope, animate] = useAnimate()

  const [displayIdx, setDisplayIdx] = useState(0)
  const [nextIdx,    setNextIdx]    = useState(1)

  const canAnimate   = images.length > 1
  const rotateKey    = axis === 'y' ? 'rotateY' : 'rotateX'
  const backTransform = axis === 'y' ? 'rotateY(180deg)' : 'rotateX(180deg)'

  useEffect(() => {
    if (!flip || !canAnimate || lockRef.current) return
    lockRef.current = true

    const next = (idxRef.current + 1) % images.length

    if (prefersReduced) {
      idxRef.current = next
      setDisplayIdx(next)
      setNextIdx((next + 1) % images.length)
      lockRef.current = false
      onFlipDone()
      return
    }

    ;(async () => {
      // Flip 0 → 180: back face (next image) becomes visible
      await animate(scope.current, { [rotateKey]: 180 }, {
        duration: FLIP_MS / 1000,
        ease: 'easeInOut',
      })
      // Promote back face to front, pre-load next image for back face
      idxRef.current = next
      setDisplayIdx(next)
      setNextIdx((next + 1) % images.length)
      // Instant reset to 0 — no reverse animation, new image is now front
      await animate(scope.current, { [rotateKey]: 0 }, { duration: 0 })
      lockRef.current = false
      onFlipDone()
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flip])

  if (!images.length) return <>{placeholder}</>

  if (!canAnimate) {
    return (
      <Image
        className="w-full h-full object-cover"
        src={images[displayIdx]}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
      />
    )
  }

  return (
    <div className="relative w-full h-full" style={{ perspective: '1200px' }}>
      <motion.div
        ref={scope}
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front face — imagen actual */}
        <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
          <Image
            className="w-full h-full object-cover"
            src={images[displayIdx]}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
          />
        </div>
        {/* Back face — próxima imagen, pre-rotada para verse correcta al girar */}
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: 'hidden', transform: backTransform }}
        >
          <Image
            className="w-full h-full object-cover"
            src={images[nextIdx]}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
          />
        </div>
      </motion.div>
    </div>
  )
}

// ─── Main grid component ──────────────────────────────────────────────────────

export const BannerGridVideo: React.FC<GridProps> = ({
  items,
  videoPosition,
  priority = false,
}) => {
  const playerRef = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [hasError,     setHasError]     = useState(false)
  // El ReactPlayer de Vimeo (~varios MB c/u) recién se monta cuando el grid
  // entra al viewport. Sin esto, las 3 instancias del home buffereaban su video
  // de entrada aunque estuvieran fuera de pantalla. Hasta entonces se ve el poster.
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )
  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Normalise to arrays
  const imagesH = Array.isArray(items.imageH)
    ? items.imageH
    : items.imageH ? [items.imageH] : []
  const imagesV = Array.isArray(items.imageV)
    ? items.imageV
    : items.imageV ? [items.imageV] : []

  // Intercalated flip triggers:
  //   tick 0 → H flips  (t = 0, 5, 10 s …)
  //   tick 1 → V flips  (t = 2.5, 7.5, 12.5 s …)
  const [flipH, setFlipH] = useState(false)
  const [flipV, setFlipV] = useState(false)

  useEffect(() => {
    if (imagesH.length < 2 && imagesV.length < 2) return

    let tick = 0
    const id = window.setInterval(() => {
      if (tick % 2 === 0) {
        setFlipH(true)
      } else {
        setFlipV(true)
      }
      tick++
    }, 5000)

    return () => window.clearInterval(id)
  }, [imagesH.length, imagesV.length])

  const handleFlipHDone = useCallback(() => setFlipH(false), [])
  const handleFlipVDone = useCallback(() => setFlipV(false), [])

  const getGridStyles = (position: VideoPosition) => {
    switch (position) {
      case 'top-left':
        return { videoGridArea: '1 / 1 / 3 / 3', image1GridArea: '3 / 1 / 4 / 3', image2GridArea: '1 / 3 / 4 / 4' }
      case 'top-right':
        return { videoGridArea: '1 / 2 / 3 / 4', image1GridArea: '3 / 2 / 4 / 4', image2GridArea: '1 / 1 / 4 / 2' }
      case 'bottom-left':
        return { videoGridArea: '2 / 1 / 4 / 3', image1GridArea: '1 / 1 / 2 / 3', image2GridArea: '1 / 3 / 4 / 4' }
      case 'bottom-right':
      default:
        return { videoGridArea: '2 / 2 / 4 / 4', image1GridArea: '1 / 2 / 2 / 4', image2GridArea: '1 / 1 / 4 / 2' }
    }
  }

  const { videoGridArea, image1GridArea, image2GridArea } = getGridStyles(videoPosition)

  if (!items.video) return <div></div>

  return (
    <AnimatePresence mode="wait">
      <div
        ref={containerRef}
        className="relative w-full max-w-7xl mx-auto px-0 grid grid-cols-3 aspect-square lg:aspect-video grid-rows-3 gap-1 lg:gap-1.5"
      >

        {/* Video: 2x2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="relative flex items-center justify-center text-white overflow-hidden"
          style={{ gridArea: videoGridArea }}
        >
          {items.videoFrame && (!isVideoReady || hasError) && (
            <Image
              className="w-full h-full object-cover transition-opacity duration-300"
              src={items.videoFrame}
              alt="Vista previa del video"
              fill
              sizes="(max-width: 1280px) 66vw, 853px"
              priority={priority}
            />
          )}
          <div
            className={`w-full h-full aspect-square transition-opacity duration-300 ${
              isVideoReady && !hasError
                ? 'opacity-100 scale-200 lg:scale-100'
                : 'opacity-0 scale-0'
            }`}
          >
            {inView && (
              <ReactPlayer
                ref={playerRef}
                url={items.video}
                width="100%"
                height="100%"
                playing={true}
                muted
                loop
                playsinline
                controls={false}
                onReady={() => setIsVideoReady(true)}
                onError={() => setHasError(true)}
              />
            )}
          </div>
        </motion.div>

        {/* Image 1: 2x1 — horizontal */}
        <motion.div
          initial={{ opacity: 0, scale: 0, transformOrigin: 'center', x: '100%', y: '-100%' }}
          animate={{ opacity: 1, scale: 1, transformOrigin: 'center', x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          className="relative flex items-center justify-center overflow-hidden"
          style={{ gridArea: image1GridArea }}
        >
          <SplitFlapImage
            images={imagesH}
            alt="Horizontal Image"
            sizes="(max-width: 1280px) 66vw, 853px"
            flip={flipH}
            onFlipDone={handleFlipHDone}
            priority={priority}
            placeholder={
              <div className="w-full h-full bg-linear-to-b from-neutral-600 to-neutral-800 animate-pulse" />
            }
          />
          {/* Vertical centre divider */}
          <div className="z-20 absolute top-0 w-full h-full">
            <div className="w-1/2 h-full border-black border-r-4 md:border-r-4 lg:border-r-6" />
          </div>
        </motion.div>

        {/* Image 2: 1x3 — vertical */}
        <motion.div
          initial={{ opacity: 0, scale: 0, transformOrigin: 'center', x: '-100%', y: '100%' }}
          animate={{ opacity: 1, scale: 1, transformOrigin: 'center', x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          className="relative flex items-center justify-center overflow-hidden"
          style={{ gridArea: image2GridArea }}
        >
          <SplitFlapImage
            images={imagesV}
            alt="Vertical Image"
            sizes="(max-width: 1280px) 33vw, 427px"
            flip={flipV}
            onFlipDone={handleFlipVDone}
            axis="y"
            priority={priority}
            placeholder={
              <div className="w-full h-full bg-linear-to-r from-neutral-600 to-neutral-800 animate-pulse" />
            }
          />
          {/* Horizontal centre bars */}
          <div className="z-20 absolute top-0 w-full h-full flex flex-col items-center justify-center">
            <div className="w-full h-1/3 outline-black outline-2 md:outline-[5px] border-black border-y md:border-y-2 lg:outline-4 lg:border-y-2" />
          </div>
        </motion.div>

        {/* Shadow borders */}
        <div className="absolute z-20 w-full h-full">
          <div className="absolute top-0 left-0 w-1/4 h-full bg-linear-to-r from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-0 right-0 w-1/4 h-full bg-linear-to-l from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-0 w-full h-1/4 bg-linear-to-b from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 w-full h-1/4 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        </div>
      </div>
    </AnimatePresence>
  )
}
