export const clients = ['EsSalud', 'Caja Piura', 'UCV', 'USAT', 'AgrOlmos', 'Real Plaza', 'Adecco', 'SUNARP'];
// TODO(Frío Norte): confirm figures.
export const stats = [
  { value: '11+', label: 'años de experiencia' },
  { value: '500+', label: 'proyectos instalados' },
  { value: '24 h', label: 'respuesta a cotizaciones' },
  { value: '100%', label: 'repuestos originales' },
];
export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  company: string;
  /** Contralio project slug — adds the photo, context tag and "Ver proyecto" link. */
  projectSlug?: string;
  /** Shown when there's no project, e.g. "Socio" for partners. */
  tag?: string;
  featured?: boolean;
  /** TODO: placeholder copy — swap for the client's real, approved quote before publishing. */
  draft?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote: 'Climatizamos cuatro pisos sin cerrar la agencia un solo día. El equipo trabajaba de noche y cada mañana todo estaba operativo.',
    author: 'Nombre Apellido',
    role: 'Jefe de Infraestructura',
    company: 'Caja Piura',
    projectSlug: 'caja-piura-sede-trujillo',
    featured: true,
    draft: true,
  },
  {
    quote: 'Mantenimiento programado en vacaciones: cero clases interrumpidas desde que trabajamos con FrioNorte.',
    author: 'Nombre Apellido',
    role: 'Administración del campus',
    company: 'UTP Chiclayo',
    projectSlug: 'utp-chiclayo',
    draft: true,
  },
  {
    quote: 'Juntos hemos construido una alianza firme y un crecimiento sostenido.',
    author: 'Milagros Quispe',
    company: 'Coinrefri Air SAC',
    tag: 'Socio',
  },
];

/** Public Google Business rating. Leave null until there's a real, verifiable profile. */
export const reviewSummary: { rating: number; count: number; url: string } | null = null;

// Sectors we specialise in. `clients` are real accounts in that sector; empty = hide the "who" block.
export const sectors = [
  {
    slug: 'universidades',
    tag: 'Educación',
    title: 'Universidades',
    summary: 'Aulas, auditorios y laboratorios con ocupación que cambia cada hora.',
    clients: ['UCV', 'USAT', 'UTP Chiclayo'],
    benefits: ['Equipos de bajo ruido para no interrumpir clases', 'Zonificación por pabellón y horario', 'Mantenimiento programado en vacaciones'],
    photo: 'utp-chiclayo',
  },
  {
    slug: 'clinicas',
    tag: 'Salud',
    title: 'Clínicas',
    summary: 'Consultorios, salas de espera y áreas críticas que no pueden detenerse.',
    clients: ['EsSalud'],
    benefits: ['Filtración y renovación de aire controlada', 'Respaldo y atención prioritaria 24/7', 'Protocolos de limpieza en áreas sensibles'],
    photo: 'essalud-tacna',
  },
  {
    slug: 'gimnasios',
    tag: 'Deporte y bienestar',
    title: 'Gimnasios',
    summary: 'Espacios con mucha gente en movimiento, calor y humedad constantes.',
    clients: ['Smart Fit'],
    benefits: ['Cálculo por aforo y actividad física', 'Control de humedad y olores', 'Equipos para operación de largas jornadas'],
    photo: 'gimnasio',
  },
];

export const partners = [
  { name: 'LG', logo: 'lg', benefits: ['Garantía de fábrica gestionada por nosotros', 'Repuestos originales LG', 'Técnicos capacitados por LG'], cta: { label: 'Ver equipos LG', href: '/productos?marca=LG' } },
  { name: 'Midea', logo: 'midea', benefits: ['Garantía de fábrica gestionada por nosotros', 'Repuestos originales Midea', 'Técnicos capacitados por Midea'], cta: { label: 'Cotizar equipos Midea', href: '/cotizar' } },
];
