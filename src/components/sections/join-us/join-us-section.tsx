'use client'

import { useMemo, useRef, useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'motion/react'
import { useLocale, useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { Send, Mail, Paperclip, X } from 'lucide-react'

import {
  buildJoinUsClientSchema,
  type JoinUsClientFormData,
} from '@/lib/schemas/join-us'
import { SectionHeading } from '@/components/ui/section-heading'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CountryCombobox } from '@/components/ui/country-combobox'
import { cn } from '@/lib/utils'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay },
})

export function JoinUsSection() {
  const t = useTranslations('JoinUs')
  const tv = useTranslations('Validation')
  const locale = useLocale()
  const [loading, setLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragCounterRef = useRef(0)

  const schema = useMemo(() => buildJoinUsClientSchema(tv), [tv])

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<JoinUsClientFormData>({
    resolver: zodResolver(
      schema,
    ) as unknown as Resolver<JoinUsClientFormData>,
  })

  const countryValue = watch('country')
  const cvValue = watch('cv')

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      toast.error(t('cvMustBePdf'))
      return
    }
    setValue('cv', file, { shouldValidate: true })
    if (fileInputRef.current) {
      const dt = new DataTransfer()
      dt.items.add(file)
      fileInputRef.current.files = dt.files
    }
  }

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current += 1
    if (e.dataTransfer.types.includes('Files')) setIsDragging(true)
  }
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current -= 1
    if (dragCounterRef.current <= 0) {
      dragCounterRef.current = 0
      setIsDragging(false)
    }
  }
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'copy'
  }
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current = 0
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleCvClear = () => {
    setValue('cv', undefined as unknown as File, { shouldValidate: true })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const onSubmit = async (data: JoinUsClientFormData) => {
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('name', data.name)
      fd.append('email', data.email)
      fd.append('country', data.country)
      fd.append('cv', data.cv)
      if (data.linkedin) fd.append('linkedin', data.linkedin)
      if (data.portfolio) fd.append('portfolio', data.portfolio)
      fd.append('locale', locale)

      const res = await fetch('/api/join-us', { method: 'POST', body: fd })
      if (!res.ok) throw new Error()

      toast.success(t('success'))
      reset()
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch {
      toast.error(t('error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-background pt-24 lg:pt-28 xl:pt-32 pb-14 lg:pb-24 px-5 md:px-10 lg:px-16 xl:px-24 overflow-hidden">
      <div className="max-w-[1528px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <motion.div {...fadeUp(0)} className="flex flex-col gap-8">
            <SectionHeading
              label={t('label')}
              titleClassName="leading-tight md:leading-12 lg:leading-14 xl:leading-16"
              title={t.rich('heading', {
                white: (chunks) => (
                  <span className="text-white italic">{chunks}</span>
                ),
                mint: (chunks) => (
                  <span className="text-mint block italic">{chunks}</span>
                ),
              })}
            />
            <p className="text-white/70 text-base lg:text-lg leading-relaxed max-w-md">
              {t('subtitle')}
            </p>

            <motion.div
              {...fadeUp(0.1)}
              className="group flex items-center gap-4"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 group-hover:border-mint group-hover:bg-mint/10 transition-all duration-300">
                <Mail className="size-4 text-white/50 group-hover:text-mint transition-colors duration-300" />
              </div>
              <div>
                <p className="text-white/30 text-xs uppercase tracking-widest">
                  {t('Email')}
                </p>
                <p className="text-white text-sm">hola@memoob.com</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.div {...fadeUp(0.15)}>
            <div
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDragOver={onDragOver}
              onDrop={onDrop}
              className={cn(
                'relative rounded-xl border bg-surface p-6 lg:p-8 transition-colors duration-200',
                isDragging ? 'border-mint/60 bg-mint/5' : 'border-white/5',
              )}
            >
              {isDragging && (
                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-xl border-2 border-dashed border-mint/60 bg-background/80 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-2 text-mint">
                    <Paperclip className="size-8" />
                    <p className="font-display text-lg uppercase tracking-widest">
                      {t('dragTitle')}
                    </p>
                    <p className="text-xs text-white/50">{t('dragHint')}</p>
                  </div>
                </div>
              )}
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-5"
              >
                {/* Nombre + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    {...fadeUp(0.2)}
                    className="flex flex-col gap-1.5"
                  >
                    <Label htmlFor="name" className="text-white/70">
                      {t('Name')} <span className="text-mint">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder={t('namePlaceholder')}
                      className="h-10 bg-surface-lighter border-white/10 focus-visible:border-mint focus-visible:ring-mint/30 placeholder:text-white/20"
                      aria-invalid={!!errors.name}
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    {...fadeUp(0.25)}
                    className="flex flex-col gap-1.5"
                  >
                    <Label htmlFor="email" className="text-white/70">
                      {t('emailLabel')} <span className="text-mint">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('emailPlaceholder')}
                      className="h-10 bg-surface-lighter border-white/10 focus-visible:border-mint focus-visible:ring-mint/30 placeholder:text-white/20"
                      aria-invalid={!!errors.email}
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </motion.div>
                </div>

                {/* País */}
                <motion.div {...fadeUp(0.3)} className="flex flex-col gap-1.5">
                  <Label className="text-white/70">
                    {t('Country')} <span className="text-mint">*</span>
                  </Label>
                  <CountryCombobox
                    value={countryValue}
                    onChange={(val) =>
                      setValue('country', val, { shouldValidate: true })
                    }
                  />
                  {errors.country && (
                    <p className="text-xs text-destructive">
                      {errors.country.message}
                    </p>
                  )}
                </motion.div>

                {/* CV PDF */}
                <motion.div {...fadeUp(0.35)} className="flex flex-col gap-1.5">
                  <Label className="text-white/70">
                    {t('cvLabel')} <span className="text-mint">*</span>{' '}
                    <span className="text-white/30 font-normal text-xs">
                      {t('cvHelper')}
                    </span>
                  </Label>

                  {cvValue?.name ? (
                    <div className="flex h-10 items-center gap-3 rounded-lg border border-mint/40 bg-surface-lighter px-3">
                      <Paperclip className="size-4 shrink-0 text-mint" />
                      <span className="flex-1 truncate text-sm text-white">
                        {cvValue.name}
                      </span>
                      <button
                        type="button"
                        onClick={handleCvClear}
                        className="rounded p-0.5 hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label
                      className={cn(
                        'flex h-10 cursor-pointer items-center gap-3 rounded-lg border border-dashed border-white/20 bg-surface-lighter px-3 transition-colors hover:border-mint/50 hover:bg-mint/5',
                        errors.cv && 'border-destructive/50',
                      )}
                    >
                      <Paperclip className="size-4 shrink-0 text-white/30" />
                      <span className="text-sm text-white/30">
                        {t('cvPlaceholder')}
                      </span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf"
                        className="sr-only"
                        onChange={(e) => handleFiles(e.target.files)}
                      />
                    </label>
                  )}

                  {errors.cv && (
                    <p className="text-xs text-destructive">
                      {errors.cv.message as string}
                    </p>
                  )}
                </motion.div>

                {/* LinkedIn (opcional) */}
                <motion.div {...fadeUp(0.4)} className="flex flex-col gap-1.5">
                  <Label htmlFor="linkedin" className="text-white/70">
                    {t('linkedinLabel')}{' '}
                    <span className="text-white/30 font-normal text-xs">
                      {t('optional')}
                    </span>
                  </Label>
                  <Input
                    id="linkedin"
                    type="url"
                    placeholder={t('linkedinPlaceholder')}
                    className="h-10 bg-surface-lighter border-white/10 focus-visible:border-mint focus-visible:ring-mint/30 placeholder:text-white/20"
                    aria-invalid={!!errors.linkedin}
                    {...register('linkedin')}
                  />
                  {errors.linkedin && (
                    <p className="text-xs text-destructive">
                      {errors.linkedin.message}
                    </p>
                  )}
                </motion.div>

                {/* Portfolio (opcional) */}
                <motion.div {...fadeUp(0.45)} className="flex flex-col gap-1.5">
                  <Label htmlFor="portfolio" className="text-white/70">
                    {t('portfolioLabel')}{' '}
                    <span className="text-white/30 font-normal text-xs">
                      {t('optional')}
                    </span>
                  </Label>
                  <Input
                    id="portfolio"
                    type="url"
                    placeholder={t('portfolioPlaceholder')}
                    className="h-10 bg-surface-lighter border-white/10 focus-visible:border-mint focus-visible:ring-mint/30 placeholder:text-white/20"
                    aria-invalid={!!errors.portfolio}
                    {...register('portfolio')}
                  />
                  {errors.portfolio && (
                    <p className="text-xs text-destructive">
                      {errors.portfolio.message}
                    </p>
                  )}
                </motion.div>

                {/* Submit */}
                <motion.div
                  {...fadeUp(0.5)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-mint hover:bg-mint-dark text-black font-display text-lg tracking-widest uppercase rounded-lg transition-colors duration-300 disabled:opacity-60"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2 text-white">
                        <span className="size-4 rounded-full border-2 border-white border-t-white/30 animate-spin" />
                        {t('sending')}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-white">
                        <Send className="size-4" />
                        {t('submit')}
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
