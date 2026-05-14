export interface ThemeBanner {
  video: string
  videoFrame: string
  imageH: string
  imageV: string
}

export interface ThemeHeroData {
  title: string
  description: string
  banner: ThemeBanner
  videoPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

export interface ThemeStatsData {
  value: number
  unit: string
  label: string
  caption: string
  ctaText: string
}

export interface ThemeProduct {
  id: string
  logo: string
  mockup: string
  demoUrl: string
  alt?: string
}

export interface ThemeContent {
  hero: ThemeHeroData
  stats: ThemeStatsData
  products: ThemeProduct[]
}
