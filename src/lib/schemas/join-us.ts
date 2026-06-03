import { z } from 'zod'
import type { Translator } from './contact'

const CV_MAX_SIZE = 5 * 1024 * 1024 // 5 MB

/** es fallback messages, used for server-side validation when no translator is provided. */
const fallback: Translator = (key) =>
  ({
    nameMin: 'El nombre debe tener al menos 2 caracteres',
    emailInvalid: 'Ingresá un email válido',
    countryRequired: 'Seleccioná un país',
    cvRequired: 'Adjuntá tu CV en PDF',
    cvPdf: 'El archivo debe ser un PDF',
    cvSize: 'El PDF no puede superar los 5 MB',
    linkedinUrl: 'Ingresá una URL válida de LinkedIn',
    portfolioUrl: 'Ingresá una URL válida',
  })[key] ?? key

export function buildJoinUsClientSchema(t: Translator) {
  return z.object({
    name: z.string().min(2, t('nameMin')),
    email: z.string().email(t('emailInvalid')),
    country: z.string().min(1, t('countryRequired')),
    cv: z
      .instanceof(File, { message: t('cvRequired') })
      .refine((f) => f.type === 'application/pdf', t('cvPdf'))
      .refine((f) => f.size <= CV_MAX_SIZE, t('cvSize')),
    linkedin: z
      .string()
      .url(t('linkedinUrl'))
      .or(z.literal(''))
      .optional(),
    portfolio: z
      .string()
      .url(t('portfolioUrl'))
      .or(z.literal(''))
      .optional(),
  })
}

/** Default client schema with es fallback messages. */
export const joinUsClientSchema = buildJoinUsClientSchema(fallback)

export const joinUsServerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  country: z.string().min(1),
  linkedin: z.string().url().or(z.literal('')).optional(),
  portfolio: z.string().url().or(z.literal('')).optional(),
})

export type JoinUsClientFormData = z.infer<typeof joinUsClientSchema>
export type JoinUsServerData = z.infer<typeof joinUsServerSchema>
