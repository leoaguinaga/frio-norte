import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro/zod';
import { createLead } from '../lib/contralio';

const phone = z.string({ message: 'Ingresa tu teléfono' }).trim().regex(/^[+\d\s-]{7,15}$/, 'Ingresa un teléfono válido');
// Fields a given form doesn't render arrive as null; normalise them to undefined.
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
      projectRef: opt,
      city: opt,
      area: opt.pipe(z.coerce.number().positive('Ingresa un área válida').optional()),
      message: opt.pipe(z.string().max(1000).optional()),
      page: opt.transform((v) => v ?? '/'),
      utm: opt,
      company: opt.pipe(z.undefined({ message: 'spam' })), // honeypot: real users never fill it
      privacy: z.literal('on', { message: 'Debes aceptar la política de privacidad' }).nullish().refine((v) => v === 'on', 'Debes aceptar la política de privacidad'),
    }),
    handler: async ({ page, utm, company: _hp, privacy: _p, ...data }) => {
      try {
        const utmParams = utm ? Object.fromEntries(new URLSearchParams(utm)) : undefined;
        return await createLead({ ...data, source: { page, utm: utmParams } });
      } catch (err) {
        console.error(err);
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'No pudimos enviar tu solicitud. Escríbenos por WhatsApp.' });
      }
    },
  }),
};
