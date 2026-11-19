import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro/zod';
import { createLead } from '../lib/contralio';

const phone = z.string({ message: 'Ingresa tu teléfono' }).trim().regex(/^[+\d\s-]{7,15}$/, 'Ingresa un teléfono válido');
// Fields a given form doesn't render arrive as null; normalise them to undefined.
const MAX_PHOTOS = 6;
const MAX_PHOTO_BYTES = 1.5 * 1024 * 1024; // client compresses to ~300 KB; this only stops abuse
const photo = z
  .instanceof(File)
  .refine((f) => f.type.startsWith('image/'), 'Solo se aceptan imágenes')
  .refine((f) => f.size <= MAX_PHOTO_BYTES, 'Una de las fotos es demasiado pesada');
const opt = z.string().trim().nullish().transform((v) => v || undefined);

export const server = {
  createLead: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string({ message: 'Ingresa tu nombre' }).trim().min(2, 'Ingresa tu nombre'),
      phone,
      email: opt.pipe(z.string().email('Correo no válido').optional()),
      segment: z.enum(['hogar', 'empresa', 'industria']).nullish().transform((v) => v ?? undefined),
      service: opt,
      product: opt,
      capacity: opt.pipe(z.coerce.number().int().positive().optional()),
      projectRef: opt,
      city: opt,
      volume: opt.pipe(z.coerce.number().positive('Ingresa un volumen válido').optional()),
      message: opt.pipe(z.string().max(1000).optional()),
      // Wholesale meeting (/mayoristas). `company` is the honeypot, so the business name uses another key.
      businessName: opt.pipe(z.string().min(2, 'Ingresa el nombre de tu empresa').max(120).optional()),
      ruc: opt.pipe(z.string().regex(/^\d{11}$/, 'El RUC tiene 11 dígitos').optional()),
      monthlyUnits: opt,
      preferredTime: opt,
      photos: z.array(photo).max(MAX_PHOTOS, `Máximo ${MAX_PHOTOS} fotos`).optional(),
      page: opt.transform((v) => v ?? '/'),
      utm: opt,
      company: opt.pipe(z.undefined({ message: 'spam' })), // honeypot: real users never fill it
      privacy: z.literal('on', { message: 'Debes aceptar la política de privacidad' }).nullish().refine((v) => v === 'on', 'Debes aceptar la política de privacidad'),
    }),
    handler: async ({ page, utm, company: _hp, privacy: _p, photos, ...data }) => {
      try {
        const utmParams = utm ? Object.fromEntries(new URLSearchParams(utm)) : undefined;
        return await createLead({ ...data, source: { page, utm: utmParams } }, photos ?? []);
      } catch (err) {
        console.error(err);
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'No pudimos enviar tu solicitud. Escríbenos por WhatsApp.' });
      }
    },
  }),
};
