// Content for /mayoristas (B2B page for climatizadoras). Mirrors Figma "/mayoristas — Aliados climatizadores".
// TODO(Frío Norte): confirm minimum order, credit terms, delivery zones and lines per brand.

export const minOrder = 'Desde X unidades por pedido';

export const pains = [
  { title: 'El equipo no llega a tiempo', text: 'Pides a Lima, esperas una semana y tu cliente final pierde la paciencia.' },
  { title: 'El margen se queda en el camino', text: 'Compras a precio de tienda y tu cotización deja de ser competitiva.' },
  { title: 'La garantía nadie la atiende', text: 'Cuando un equipo falla, el cliente te reclama a ti y el proveedor no responde.' },
];

export const benefits = [
  { title: 'Precio mayorista por volumen', text: 'Escala de precios según tus unidades al mes. Más compras, mejor margen.' },
  { title: 'Stock en Chiclayo', text: 'Equipos listos para despacho. Recoges en almacén o te los llevamos a obra.' },
  { title: 'Garantía gestionada por nosotros', text: 'Si un equipo falla, tramitamos la garantía de fábrica con LG y Midea por ti.' },
  { title: 'Repuestos originales', text: 'Repuestos de marca disponibles para que tus mantenimientos no se detengan.' },
  { title: 'Soporte técnico y capacitación', text: 'Acompañamiento en equipos nuevos y capacitaciones con las marcas.' },
  { title: 'Asesor comercial dedicado', text: 'Una sola persona que conoce tu negocio, tus precios y tus pedidos.' },
];

export const brandLines = [
  { name: 'LG', logo: 'lg', text: 'Línea residencial y comercial con tecnología Dual Inverter.', lines: ['Split pared Artcool', 'Dual Inverter', 'Cassette', 'Piso-techo', 'Multi V'] },
  { name: 'Midea', logo: 'midea', text: 'Equipos de alta rotación con excelente relación precio-calidad.', lines: ['Split pared', 'Inverter', 'Cassette', 'Piso-techo', 'Ducto'] },
] as const;

export const steps = [
  { title: 'Reunión estratégica', text: 'Conversamos 30 minutos sobre tu volumen, tus proyectos y las marcas que trabajas.' },
  { title: 'Propuesta de condiciones', text: 'Te enviamos precios, plazos de entrega y forma de pago por escrito.' },
  { title: 'Primer pedido', text: 'Despachamos desde Chiclayo y validamos juntos los tiempos de entrega.' },
  { title: 'Abastecimiento continuo', text: 'Pedidos recurrentes con tu asesor y precios que mejoran con el volumen.' },
];

export const audience = [
  'Climatizadoras e instaladores formales con RUC',
  'Constructoras e inmobiliarias con proyectos en curso',
  'Empresas de mantenimiento que necesitan equipos y repuestos',
  'Técnicos independientes que quieren crecer con respaldo',
];

export const meetingAgenda = [
  'Revisamos tu volumen mensual y los proyectos que tienes en cartera',
  'Comparamos tus precios actuales con nuestra escala mayorista',
  'Definimos plazos de entrega, despacho y forma de pago',
  'Sales con una propuesta por escrito, sin compromiso',
];

export const faq = [
  { q: '¿Cuál es el pedido mínimo para acceder a precio mayorista?', a: 'Depende de la línea y la marca. En la reunión revisamos tu volumen y te damos la escala de precios por escrito.' },
  { q: '¿Ofrecen crédito o plazo de pago?', a: 'Para aliados con pedidos recurrentes evaluamos condiciones de pago. Lo conversamos en la reunión estratégica.' },
  { q: '¿Despachan fuera de Chiclayo?', a: 'Sí, despachamos a todo el norte del Perú. Los plazos y costos de envío se definen según la ciudad y el volumen.' },
  { q: '¿Quién atiende la garantía si un equipo falla?', a: 'Nosotros. Tramitamos la garantía de fábrica con LG y Midea para que tú no pierdas tiempo ni al cliente.' },
  { q: '¿Emiten factura y contrato comercial?', a: 'Sí. Todas las compras se facturan y las condiciones acordadas quedan por escrito.' },
];

export const monthlyUnitOptions = ['1 a 10 equipos', '10 a 30 equipos', '30 a 60 equipos', 'Más de 60 equipos'].map((v) => ({ value: v, label: v }));
export const preferredTimeOptions = ['Mañana (9:00–13:00)', 'Tarde (14:00–19:00)', 'Me da igual'].map((v) => ({ value: v, label: v }));
