export const site = {
  name: 'Frío Norte',
  legalName: 'Frío Norte S.A.C.',
  url: 'https://frionorte.com.pe',
  tagline: 'Venta, instalación y mantenimiento de aire acondicionado en el norte del Perú.',
  phone: '074-323024',
  phoneHref: 'tel:+5174323024',
  email: 'ventas@frionorte.com.pe',
  address: 'Prol. Bolognesi Mz A Lt 04, PP.JJ. Espiga de Oro, Chiclayo',
  hours: 'Lun–Sáb · 8:00–19:00',
  mapsUrl: 'https://maps.google.com/?q=Frio+Norte+Chiclayo',
  whatsapp: import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? '51999999999',
  social: [
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'YouTube', href: 'https://youtube.com' },
  ],
} as const;

export const nav = [
  { label: 'Servicios', href: '/servicios' },
  { label: 'Equipos', href: '/productos' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Nosotros', href: '/nosotros' },
] as const;

export const whatsappLink = (text = 'Hola, quiero una cotización') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
