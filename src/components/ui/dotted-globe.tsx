'use client'

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import landCoords from '@/data/globe-land-coordinates.json'

const GLOBE_RADIUS = 1.8
const PIN_RADIUS = 0.035
const MINT = '#40b09d'

// — Pin data: [city, country, flag emoji, lat, lng] —
const PINS: [string, string, string, number, number][] = [
  // América del Sur
  ['Buenos Aires', 'Argentina',  '🇦🇷', -34.60, -61.00],
  ['Brasilia',     'Brasil',     '🇧🇷', -15.78, -47.93],
  ['Bogotá',       'Colombia',   '🇨🇴',   4.71, -74.07],
  ['Lima',         'Perú',       '🇵🇪', -12.05, -77.04],
  ['Santiago',     'Chile',      '🇨🇱', -33.45, -70.67],
  ['Caracas',      'Venezuela',  '🇻🇪',  10.49, -66.88],
  ['Montevideo',   'Uruguay',    '🇺🇾', -34.90, -55.19],
  ['Quito',        'Ecuador',    '🇪🇨',  -0.22, -78.51],
  ['La Paz',       'Bolivia',    '🇧🇴', -16.50, -68.15],
  ['Asunción',     'Paraguay',   '🇵🇾', -25.28, -57.63],
  // América del Norte
  ['Ciudad de México', 'México', '🇲🇽',  19.43, -99.13],
  // Europa
  ['Madrid',    'España',    '🇪🇸', 40.42,  -3.70],
  ['Lisboa',    'Portugal',  '🇵🇹', 38.72,  -9.14],
  // África
  ['Abuja',    'Nigeria',     '🇳🇬',  9.07,   7.40],
  ['Accra',    'Ghana',       '🇬🇭',  5.56,  -0.20],
  ['Lusaka',   'Zambia',      '🇿🇲', -15.42, 28.28],
  ['Nairobi',  'Kenia',       '🇰🇪',  -1.29, 36.82],
  ['Maputo',   'Mozambique',  '🇲🇿', -25.97, 32.59],
  // Asia / Medio Oriente
  ['Abu Dhabi', 'UAE',        '🇦🇪', 24.47, 54.37],
]

// Ease out with overshoot (mirrors cubic-bezier [0.34, 1.56, 0.64, 1])
function easeOutBack(t: number): number {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

// Convert lat/lng to 3D cartesian on a sphere
function latLngToVec3(
  lat: number,
  lng: number,
  radius: number,
): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return [
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ]
}

// — Individual pin with glow + hover tooltip —
function Pin({
  country,
  flag,
  lat,
  lng,
}: {
  country: string
  flag: string
  lat: number
  lng: number
}) {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()

  const position = useMemo(
    () => latLngToVec3(lat, lng, GLOBE_RADIUS + 0.01),
    [lat, lng],
  )

  // Track if pin faces the camera — use state so it's readable in render,
  // but only call setState when the value actually changes (≈ twice per rotation)
  const [isFacing, setIsFacing] = useState(true)
  const facingRef = useRef(true)

  useFrame(() => {
    if (!meshRef.current) return
    const pinWorldPos = new THREE.Vector3()
    meshRef.current.getWorldPosition(pinWorldPos)
    const camDir = new THREE.Vector3()
      .subVectors(camera.position, new THREE.Vector3(0, 0, 0))
      .normalize()
    const pinDir = pinWorldPos.clone().normalize()
    const facing = camDir.dot(pinDir) > 0.15
    if (facing !== facingRef.current) {
      facingRef.current = facing
      setIsFacing(facing)
    }
  })

  const pulseElapsed = useRef(0)
  useFrame((_, delta) => {
    if (!glowRef.current) return
    pulseElapsed.current += delta
    const pulse = 1 + Math.sin(pulseElapsed.current * 3) * 0.3
    glowRef.current.scale.setScalar(hovered ? 2.5 : pulse)
  })

  return (
    <group position={position}>
      {/* Hit area — invisible larger sphere for easier hover */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
      >
        <sphereGeometry args={[PIN_RADIUS * 4, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Bright core */}
      <mesh>
        <sphereGeometry args={[PIN_RADIUS, 12, 12]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Glow ring */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[PIN_RADIUS * 1.8, 12, 12]} />
        <meshBasicMaterial
          color="white"
          transparent
          opacity={hovered ? 0.6 : 0.25}
          depthWrite={false}
        />
      </mesh>

      {/* Tooltip — HTML overlay positioned in 3D space */}
      {hovered && isFacing && (
        <Html center distanceFactor={5} style={{ pointerEvents: 'none' }}>
          <div className="flex items-center gap-2 bg-black/85 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5 whitespace-nowrap -translate-y-8">
            <span className="text-lg leading-none">{flag}</span>
            <span className="text-white text-xs font-semibold">{country}</span>
          </div>
        </Html>
      )}
    </group>
  )
}

// — All pins —
function GlobePins() {
  return (
    <>
      {PINS.map(([city, country, flag, lat, lng]) => (
        <Pin
          key={city}
          country={country}
          flag={flag}
          lat={lat}
          lng={lng}
        />
      ))}
    </>
  )
}

function GlobeDots() {
  const pointsRef = useRef<THREE.Points>(null)

  const geometry = useMemo(() => {
    const coords = landCoords as [number, number][]
    const positions = new Float32Array(coords.length * 3)

    coords.forEach(([lat, lng], i) => {
      const [x, y, z] = latLngToVec3(lat, lng, GLOBE_RADIUS)
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
    })

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={MINT}
        size={0.028}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  )
}

// Subtle outer wireframe ring for depth
function GlobeRing() {
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(GLOBE_RADIUS, 36, 36)
  }, [])

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial
        color={MINT}
        wireframe
        transparent
        opacity={0.04}
        depthWrite={false}
      />
    </mesh>
  )
}

function GlobeScene() {
  const groupRef = useRef<THREE.Group>(null)
  const elapsed = useRef(0)
  const DURATION = 0.9

  useFrame((_, delta) => {
    if (!groupRef.current) return
    if (elapsed.current < DURATION) {
      elapsed.current = Math.min(elapsed.current + delta, DURATION)
      const t = elapsed.current / DURATION
      const s = Math.max(0, easeOutBack(t))
      groupRef.current.scale.setScalar(s)
    }
  })

  return (
    <group ref={groupRef} scale={0} rotation={[0.1, 0.4, 0]}>
      <GlobeDots />
      <GlobeRing />
      <GlobePins />
    </group>
  )
}

export function DottedGlobe() {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5.5], fov: 48 }}
      dpr={[1, 2]}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <GlobeScene />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        enableDamping
        dampingFactor={0.06}
        minPolarAngle={Math.PI * 0.22}
        maxPolarAngle={Math.PI * 0.78}
        rotateSpeed={0.5}
      />
    </Canvas>
  )
}
