export type ChecklistGroup = { title: string; items: string[] };
export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  audience: string;
  highlights: string[];
  checklist?: { title: string; groups: ChecklistGroup[] };
  faq: { q: string; a: string }[];
};

const commonFaq = [
  { q: '¿Atienden equipos que no compré con ustedes?', a: 'Sí. Trabajamos con todas las marcas, aunque somos distribuidores autorizados de LG, Daikin y York.' },
  { q: '¿Trabajan fuera de Chiclayo?', a: 'Sí, atendemos todo el norte del Perú y proyectos a nivel nacional.' },
];

export const services: Service[] = [
  {
    slug: 'asesoria-de-proyectos',
    title: 'Asesoría de proyectos',
    short: 'Ingeniería respaldada por LG para proyectos integrales.',
    description: 'Diseño y cálculo de carga térmica con el respaldo del área de ingeniería de LG, para proyectos de climatización en cualquier parte del país.',
    audience: 'Empresas · Industria',
    highlights: ['Cálculo de carga térmica', 'Planos y memoria técnica', 'Presupuesto por etapas'],
    faq: [{ q: '¿La asesoría tiene costo?', a: 'La primera evaluación es gratuita. Te enviamos una propuesta con el alcance del proyecto.' }, ...commonFaq],
  },
  {
    slug: 'instalacion',
    title: 'Instalación',
    short: 'Split, Multi V, chillers y ductos con normas internacionales.',
    description: 'Split, cassette, techo, Multi V, chillers, ductos, presurización de escaleras y extracción de monóxido, con estándares internacionales de calidad y seguridad.',
    audience: 'Hogar · Empresa · Industria',
    highlights: ['Técnicos certificados', 'Garantía de instalación', 'Limpieza al terminar'],
    faq: [{ q: '¿Cuánto demora una instalación?', a: 'Un split residencial se instala en un día. Los proyectos comerciales se programan por etapas.' }, ...commonFaq],
  },
  {
    slug: 'mantenimiento-preventivo',
    title: 'Mantenimiento preventivo',
    short: 'Planes periódicos para alargar la vida útil del equipo.',
    description: 'Alarga la vida útil de tus equipos, reduce el consumo eléctrico y respira aire libre de ácaros y bacterias.',
    audience: 'Hogar · Empresa',
    highlights: ['Informe técnico con fotos', 'Garantía de 90 días', 'Repuestos originales'],
    checklist: {
      title: '14 puntos de control en cada visita',
      groups: [
        { title: 'Limpieza', items: ['Filtros lavados y desinfectados', 'Serpentín evaporador', 'Turbina y rejillas', 'Carcasa'] },
        { title: 'Drenaje', items: ['Bandeja de condensado', 'Tubería destapada', 'Prueba de flujo', 'Anti-goteo'] },
        { title: 'Sistema eléctrico', items: ['Ajuste de borneras', 'Medición de consumo (A)', 'Capacitor y contactor'] },
        { title: 'Refrigeración', items: ['Presión de gas', 'Detección de fugas', 'Aislamiento de tuberías'] },
      ],
    },
    faq: [{ q: '¿Cada cuánto debo hacer mantenimiento?', a: 'En hogares, cada 6 meses. En oficinas y comercios con uso diario, cada 3 meses.' }, ...commonFaq],
  },
  {
    slug: 'mantenimiento-correctivo',
    title: 'Mantenimiento correctivo',
    short: 'Diagnóstico rápido con repuestos originales.',
    description: 'Personal técnico con amplia experiencia en la detección de fallas, instrumentos modernos y repuestos originales para soluciones eficientes.',
    audience: 'Hogar · Empresa · Industria',
    highlights: ['Diagnóstico el mismo día', 'Repuestos originales', 'Atención prioritaria a empresas'],
    faq: commonFaq,
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
