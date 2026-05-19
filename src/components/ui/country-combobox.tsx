'use client'

import * as React from 'react'
import { ChevronDown, Search, X } from 'lucide-react'
import { COUNTRIES, type Country } from '@/lib/countries'
import { cn } from '@/lib/utils'

interface CountryComboboxProps {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

export function CountryCombobox({
  value,
  onChange,
  placeholder = 'Seleccioná un país',
  disabled,
}: CountryComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const containerRef = React.useRef<HTMLDivElement>(null)
  const searchRef = React.useRef<HTMLInputElement>(null)

  const selected = COUNTRIES.find((c) => c.code === value)

  const filtered = React.useMemo(() => {
    if (!search) return COUNTRIES
    const q = search.toLowerCase()
    return COUNTRIES.filter((c) => c.name.toLowerCase().includes(q))
  }, [search])

  React.useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 10)
    } else {
      setSearch('')
    }
  }, [open])

  React.useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [open])

  const handleSelect = (country: Country) => {
    onChange(country.code)
    setOpen(false)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange('')
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-lg border border-input bg-surface px-3 py-2 text-sm transition-colors',
          'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring',
          'disabled:pointer-events-none disabled:opacity-50',
          open && 'border-ring ring-3 ring-ring/50',
          !selected && 'text-muted-foreground'
        )}
      >
        <span className="flex items-center gap-2 min-w-0">
          {selected ? (
            <>
              <span className="text-base leading-none">{selected.flag}</span>
              <span className="truncate text-foreground">{selected.name}</span>
            </>
          ) : (
            <span>{placeholder}</span>
          )}
        </span>
        <span className="flex items-center gap-1 shrink-0 ml-2">
          {selected && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              onKeyDown={(e) => e.key === 'Enter' && handleClear(e as unknown as React.MouseEvent)}
              className="rounded p-0.5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-3" />
            </span>
          )}
          <ChevronDown
            className={cn(
              'size-4 text-muted-foreground transition-transform duration-200',
              open && 'rotate-180'
            )}
          />
        </span>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-surface shadow-xl overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <Search className="size-4 text-muted-foreground shrink-0" />
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar país..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-3" />
              </button>
            )}
          </div>
          <div className="max-h-56 overflow-y-auto scrollbar-none py-1">
            {filtered.length === 0 ? (
              <p className="px-3 py-4 text-center text-sm text-muted-foreground">
                No se encontró ningún país
              </p>
            ) : (
              filtered.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleSelect(country)}
                  className={cn(
                    'flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-surface-lighter',
                    value === country.code && 'bg-surface-lighter text-mint'
                  )}
                >
                  <span className="text-base leading-none w-6 shrink-0">{country.flag}</span>
                  <span className="truncate">{country.name}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
