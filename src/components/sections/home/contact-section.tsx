'use client'

import { useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'motion/react'
import { toast } from 'sonner'
import { Send, Mail, MapPin } from 'lucide-react'

import { contactSchema, type ContactFormData } from '@/lib/schemas/contact'
import { SectionHeading } from '@/components/ui/section-heading'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CountryCombobox } from '@/components/ui/country-combobox'
import { MapHoverPreview } from '@/components/ui/map-hover-preview'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay },
})

export function ContactSection() {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(
      contactSchema,
    ) as unknown as Resolver<ContactFormData>,
  })

  const countryValue = watch('country')
  const messageValue = watch('message') ?? ''
  const messageCount = messageValue.length
  const MESSAGE_MAX = 500

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error()

      toast.success('¡Mensaje enviado! Te contactaremos pronto.')
      reset()
    } catch {
      toast.error('Hubo un error al enviar. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      className="bg-background pt-24 pb-14 lg:py-24 px-5 lg:px-16 xl:px-24 overflow-hidden"
      id="contact"
    >
      <div className="max-w-[1728px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: heading + info */}
          <motion.div {...fadeUp(0)} className="flex flex-col gap-8">
            <SectionHeading
              label=""
              titleClassName="leading-10"
              title={
                <>
                  Hablemos.{' '}
                  <span className="text-white italic">Construyamos</span>
                  <span className="text-mint block italic">algo juntos.</span>
                </>
              }
            />
            <p className="text-white/50 text-base lg:text-lg leading-tight max-w-md">
              Contanos tu proyecto o idea. Nuestro equipo te responderá a la
              brevedad.
            </p>

            <div className="flex flex-col gap-5 mt-2">
              {[
                { icon: Mail, label: 'Email', value: 'hola@memoob.com' },
                {
                  icon: MapPin,
                  label: 'Sede',
                  value: 'Ciudad de Buenos Aires, Argentina',
                  href: 'https://maps.app.goo.gl/cSKNi51Jtf57y7388',
                },
              ].map(({ icon: Icon, label, value, href }, i) => {
                const content = (
                  <>
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 group-hover:border-mint group-hover:bg-mint/10 transition-all duration-300">
                      <Icon className="size-4 text-white/50 group-hover:text-mint transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-widest">
                        {label}
                      </p>
                      <p className="text-white text-sm">{value}</p>
                    </div>
                  </>
                )
                return (
                  <motion.div
                    key={label}
                    {...fadeUp(0.1 + i * 0.08)}
                    className="group flex items-center gap-4"
                  >
                    {href ? (
                      <MapHoverPreview
                        href={href}
                        query="Guatemala 5582, Ciudad de Buenos Aires, Argentina"
                        className="flex items-center gap-4 w-full"
                        side="top"
                        align="start"
                      >
                        {content}
                      </MapHoverPreview>
                    ) : (
                      content
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right: form card */}
          <motion.div {...fadeUp(0.15)}>
            <div className="rounded-2xl border border-white/5 bg-surface p-6 lg:p-8">
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
                      Nombre <span className="text-mint">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Tu nombre"
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
                      Email <span className="text-mint">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
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
                    País
                    <span className="text-white/30 font-normal ml-1 text-xs">
                      (opcional)
                    </span>
                  </Label>
                  <CountryCombobox
                    value={countryValue}
                    onChange={(val) => setValue('country', val)}
                  />
                </motion.div>

                {/* Mensaje */}
                <motion.div {...fadeUp(0.4)} className="flex flex-col gap-1.5">
                  <Label htmlFor="message" className="text-white/70">
                    Mensaje <span className="text-mint">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Contanos sobre tu proyecto o consulta..."
                    rows={5}
                    maxLength={MESSAGE_MAX}
                    className="bg-surface-lighter border-white/10 focus-visible:border-mint focus-visible:ring-mint/30 placeholder:text-white/20 resize-none"
                    aria-invalid={!!errors.message}
                    {...register('message')}
                  />
                  <div className="flex items-center justify-between min-h-[1rem]">
                    <span>
                      {errors.message && (
                        <p className="text-xs text-destructive">
                          {errors.message.message}
                        </p>
                      )}
                    </span>
                    <AnimatePresence mode="popLayout">
                      {messageCount > 0 && (
                        <motion.span
                          key={messageCount}
                          initial={{ y: -5, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 5, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className={
                            messageCount >= MESSAGE_MAX
                              ? 'text-xs text-destructive'
                              : messageCount > 450
                                ? 'text-xs text-mint'
                                : 'text-xs text-white/30'
                          }
                        >
                          {messageCount}/{MESSAGE_MAX}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Submit */}
                <motion.div
                  {...fadeUp(0.45)}
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
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-white">
                        <Send className="size-4" />
                        Enviar mensaje
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
