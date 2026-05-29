import React from 'react'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  label?: string
  title: string | React.ReactNode
  description?: string
  className?: string
  titleClassName?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  label = 'SOMOS',
  title,
  description,
  className,
  titleClassName,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {label && (
        <span className="text-white text-2xl md:text-3xl lg:text-4xl font-normal tracking-widest uppercase">
          {label}
        </span>
      )}
      <h2
        className={cn(
          'text-[28px] min-[375px]:text-[40px] md:text-5xl lg:text-6xl xl:text-7xl leading-tight font-extrabold text-mint',
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="text-white/80 text-sm leading-relaxed mt-1 max-w-prose">
          <span className="font-bold text-mint">
            {description.split('.')[0]}.
          </span>
          {description.includes('.') && (
            <span>{description.substring(description.indexOf('.') + 1)}</span>
          )}
        </p>
      )}
    </div>
  )
}
