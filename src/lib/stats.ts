/**
 * Central stats utility.
 *
 * Values grow deterministically based on elapsed time since GROWTH_START_MS.
 * Each stat has its own RATE_PER_MS — adjust the human-readable comments to
 * change cadence (e.g. "1 / 10_000" = 1 every 10 seconds).
 *
 * stats-section.tsx is 'use client' and AnimatedNumber starts at 0, so there
 * is no SSR/hydration mismatch regardless of precision level.
 */

const FOUNDING_YEAR = 2010

// Date from which incremental growth is counted.
// Change this when resetting the base values.
const GROWTH_START_MS = new Date('2026-06-01').getTime()

function msElapsed(): number {
  return Math.max(0, Date.now() - GROWTH_START_MS)
}

export type StatKey = 'contentHours' | 'subscribers' | 'yearsExperience'

/**
 * Growth rate per millisecond for each stat.
 * Express as a fraction: "X / Y_ms" reads as "X per Y milliseconds".
 *   2 / 86_400_000  →  2 per day
 *   1 / 10_000      →  1 every 10 seconds
 */
const RATE_PER_MS: Record<StatKey, number> = {
  contentHours: 1 / (10 * 86_400_000), // 1 HS every 10 days (≈ 3 HS/month)
  subscribers: 218_000 / (30 * 86_400_000), // ≈ 218 000/month → tick ~cada 12s
  yearsExperience: 0, // computed from FOUNDING_YEAR
}

/**
 * Base values (as of GROWTH_START_MS).
 * yearsExperience base is the company's founding year.
 */
const BASE: Record<StatKey, number> = {
  contentHours: 1210,
  subscribers: 2_700_000,
  yearsExperience: FOUNDING_YEAR,
}

export function getStatValue(key: StatKey): number {
  if (key === 'yearsExperience') {
    return new Date().getFullYear() - FOUNDING_YEAR
  }
  return BASE[key] + Math.floor(msElapsed() * RATE_PER_MS[key])
}

/**
 * Returns the interval in ms between each +1 increment for live counters.
 * Returns null for stats that update slower than once per minute (not worth
 * polling) or stats with no growth (yearsExperience).
 */
export function getTickInterval(key: StatKey): number | null {
  const rate = RATE_PER_MS[key]
  if (!rate) return null
  const ms = Math.round(1 / rate)
  return ms <= 60_000 ? ms : null
}

/** Convenience helper for contenido theme pages. */
export function getContentThemeStats(ctaText: string) {
  return {
    value: getStatValue('contentHours'),
    unit: 'HS',
    label: 'Contenido exclusivo',
    caption: 'Contenido de corta, mediana y larga duración',
    ctaText,
  }
}
