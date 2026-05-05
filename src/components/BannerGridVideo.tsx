'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

// Define the possible positions for the video
type VideoPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

// Props for the GridComponent
interface GridProps {
  items: {
    video: string
    videoFrame: string
    imageH: string
    imageV: string
  }
  videoPosition: VideoPosition
  extraItems?: {
    imageH: string
    imageSquare: string
  }
}

export const BannerGridVideo: React.FC<GridProps> = ({
  items,
  videoPosition,
  extraItems,
}) => {
  const playerRef = useRef(null)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Define grid positions based on videoPosition prop
  const getGridStyles = (position: VideoPosition) => {
    let videoGridArea = ''
    let image1GridArea = ''
    let image2GridArea = ''

    switch (position) {
      // fila-inicio / columna-inicio / fila-fin / columna-fin
      case 'top-left':
        videoGridArea = '1 / 1 / 3 / 3' // Top-left 2x2
        image1GridArea = '3 / 1 / 4 / 3' // 2x1 next to video
        image2GridArea = '1 / 3 / 4 / 4' // 1x3 below image1
        break
      case 'top-right':
        videoGridArea = '1 / 2 / 3 / 4' // Top-right 2x2
        image1GridArea = '3 / 2 / 4 / 4' // 2x1 below video
        image2GridArea = '1 / 1 / 4 / 2' // 1x3 on the left
        break
      case 'bottom-left':
        videoGridArea = '2 / 1 / 4 / 3' // Bottom-left 2x2
        image1GridArea = '1 / 1 / 2 / 3' // 2x1 above video
        image2GridArea = '1 / 3 / 4 / 4' // 1x3 on the right
        break
      case 'bottom-right':
        videoGridArea = '2 / 2 / 4 / 4' // Bottom-right 2x2
        image1GridArea = '1 / 2 / 2 / 4' // 2x1 above video
        image2GridArea = '1 / 1 / 4 / 2' // 1x3 on the left
        break
      default:
        videoGridArea = '1 / 1 / 3 / 3' // Default to top-left
        image1GridArea = '3 / 1 / 4 / 3'
        image2GridArea = '1 / 3 / 4 / 4'
    }

    return { videoGridArea, image1GridArea, image2GridArea }
  }

  const { videoGridArea, image1GridArea, image2GridArea } =
    getGridStyles(videoPosition)

  if (!items.video) return <div></div>

  return (
    <AnimatePresence mode="wait">
      {/* Grid container with 3x3 elements */}
      <div
        className={`relative w-full max-w-7xl mx-auto px-0 grid grid-cols-3 aspect-square lg:aspect-video grid-rows-3 gap-1 lg:gap-1.5`}
      >
        {/* Video: 2x2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="relative flex items-center justify-center text-white overflow-hidden"
          style={{ gridArea: videoGridArea }}
        >
          {/* Imagen de vista previa mientras el video carga o si hay error */}
          {items.videoFrame && (!isVideoReady || hasError) && (
            <Image
              className="w-full h-full object-cover transition-opacity duration-300"
              src={items.videoFrame}
              alt="Vista previa del video"
              fill
              sizes="(max-width: 1280px) 66vw, 853px"
              priority
            />
          )}
          {/* Video */}
          <div
            className={`w-full h-full aspect-square transition-opacity duration-300 ${
              isVideoReady && !hasError
                ? 'opacity-100 scale-200 lg:scale-100'
                : 'opacity-0 scale-0'
            }`}
          >
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
          </div>
        </motion.div>

        {/* Image 1: 2x1 */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0,
            transformOrigin: 'center',
            x: '100%',
            y: '-100%',
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transformOrigin: 'center',
            x: 0,
            y: 0,
          }}
          exit={{ opacity: 0, scale: 0 }}
          className="relative flex items-center justify-center overflow-hidden"
          style={{ gridArea: image1GridArea }}
        >
          {items.imageH ? (
            <Image
              className=" w-full h-full object-cover"
              src={items.imageH}
              alt="Horizontal Image"
              fill
              sizes="(max-width: 1280px) 66vw, 853px"
            />
          ) : (
            <div className=" w-full h-full bg-linear-to-b from-neutral-600 to-neutral-800 animate-pulse flex items-center justify-center"></div>
          )}
          <div className="z-20 absolute top-0 w-full h-full">
            <div className=" w-1/2 h-full border-black border-r-4 md:border-r-4 lg:border-r-6"></div>
          </div>
        </motion.div>

        {/* Image 2: 1x3 */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0,
            transformOrigin: 'center',
            x: '-100%',
            y: '100%',
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transformOrigin: 'center',
            x: 0,
            y: 0,
          }}
          exit={{ opacity: 0, scale: 0 }}
          className=" relative flex items-center justify-center overflow-hidden"
          style={{ gridArea: image2GridArea }}
        >
          {items.imageV ? (
            <Image
              className=" w-full h-full object-cover"
              src={items.imageV}
              alt="Vertical Image"
              fill
              sizes="(max-width: 1280px) 33vw, 427px"
            />
          ) : (
            <div className=" w-full h-full bg-linear-to-r from-neutral-600 to-neutral-800 animate-pulse flex items-center justify-center"></div>
          )}
          <div className="z-20 absolute top-0 w-full h-full flex flex-col items-center justify-center">
            <div className=" w-full h-1/3 outline-black outline-2 md:outline-[5px] border-black border-y md:border-y-2 lg:outline-4 lg:border-y-2  "></div>
          </div>
        </motion.div>
        {/* Shadow borders */}
        <div className="absolute z-20 w-full h-full">
          {/* Shadow Left */}
          <div className=" absolute top-0 left-0 w-1/4 h-full bg-linear-to-r from-black/80 via-black/20 to-transparent" />
          {/* Shadow Right */}
          <div className=" absolute top-0 right-0 w-1/4 h-full bg-linear-to-l from-black/80 via-black/20 to-transparent" />
          {/* Shadow Top */}
          <div className=" absolute top-0 w-full h-1/4 bg-linear-to-b from-black/80 via-black/20 to-transparent" />
          {/* Shadow Bottom */}
          <div className=" absolute bottom-0 w-full h-1/4 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        </div>
      </div>
    </AnimatePresence>
  )
}
