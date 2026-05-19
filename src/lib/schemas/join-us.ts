import { z } from 'zod'

const CV_MAX_SIZE = 5 * 1024 * 1024 // 5 MB

export const joinUsClientSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresá un email válido'),
  country: z.string().min(1, 'Seleccioná un país'),
  cv: z
    .instanceof(File, { message: 'Adjuntá tu CV en PDF' })
    .refine((f) => f.type === 'application/pdf', 'El archivo debe ser un PDF')
    .refine((f) => f.size <= CV_MAX_SIZE, 'El PDF no puede superar los 5 MB'),
  linkedin: z
    .string()
    .url('Ingresá una URL válida de LinkedIn')
    .or(z.literal(''))
    .optional(),
  portfolio: z
    .string()
    .url('Ingresá una URL válida')
    .or(z.literal(''))
    .optional(),
})

export const joinUsServerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  country: z.string().min(1),
  linkedin: z.string().url().or(z.literal('')).optional(),
  portfolio: z.string().url().or(z.literal('')).optional(),
})

export type JoinUsClientFormData = z.infer<typeof joinUsClientSchema>
export type JoinUsServerData = z.infer<typeof joinUsServerSchema>
