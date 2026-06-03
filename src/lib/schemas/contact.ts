import { z } from 'zod'

/** Translator shape compatible with next-intl's `useTranslations`/`getTranslations`. */
export type Translator = (key: string) => string

/** es fallback messages, used for server-side validation when no translator is provided. */
const fallback: Translator = (key) =>
  ({
    nameMin: 'El nombre debe tener al menos 2 caracteres',
    emailInvalid: 'Ingresá un email válido',
    messageMin: 'El mensaje debe tener al menos 10 caracteres',
    messageMax: 'El mensaje no puede superar los 500 caracteres',
  })[key] ?? key

export function buildContactSchema(t: Translator) {
  return z.object({
    name: z.string().min(2, t('nameMin')),
    email: z.string().email(t('emailInvalid')),
    message: z
      .string()
      .min(10, t('messageMin'))
      .max(500, t('messageMax')),
    country: z.string().optional(),
  })
}

/** Default schema with es fallback messages (server-side use in the API route). */
export const contactSchema = buildContactSchema(fallback)

export type ContactFormData = z.infer<typeof contactSchema>
