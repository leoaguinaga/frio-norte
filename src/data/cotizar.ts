// Content for /cotizar: photo guide, what we do with the photos, and home cases.
// Audience: homes and apartments (businesses are welcome, but secondary).

export type Shot = { id: 'pared' | 'ambiente' | 'exterior' | 'tablero'; title: string; how: string; why: string };
export const shots: Shot[] = [
  { id: 'pared', title: 'Pared donde irá el equipo', how: 'De frente y del piso al techo. Que se vean ventanas, enchufes o vigas cercanas.', why: 'Definir la altura de instalación y el recorrido de tubería y desagüe.' },
  { id: 'ambiente', title: 'El ambiente completo', how: 'Desde la puerta, en horizontal. Si puedes, que se vean las cuatro esquinas.', why: 'Estimar el volumen del espacio y elegir los BTU correctos, ni más ni menos.' },
  { id: 'exterior', title: 'Lugar para la unidad exterior', how: 'Azotea, balcón, patio o fachada. Incluye el acceso para llegar ahí.', why: 'Verificar ventilación, soporte y distancia hasta la unidad interior.' },
  { id: 'tablero', title: 'Tablero eléctrico', how: 'Con la tapa abierta y de cerca, que se lean las llaves.', why: 'Saber si necesitas un circuito dedicado y qué calibre de cable usar.' },
];

export const photoTips = [
  { icon: 'sun', title: 'Con luz de día', text: 'Abre cortinas o prende la luz' },
  { icon: 'landscape', title: 'En horizontal', text: 'Gira el celular de lado' },
  { icon: 'zoom', title: 'Sin zoom', text: 'Aléjate en vez de acercar' },
  { icon: 'door', title: 'Con una referencia', text: 'Una puerta ayuda a medir' },
] as const;

export const photoProcess = [
  { title: 'Un técnico las revisa', text: 'No un bot: un técnico certificado mira cada foto y mide sobre ella.' },
  { title: 'Calculamos lo que necesitas', text: 'Capacidad en BTU, recorrido de tubería, desagüe y punto eléctrico.' },
  { title: 'Recibes cotización y simulación', text: 'En menos de 24 h por WhatsApp: precio cerrado y una imagen de cómo quedaría el equipo en tu pared.' },
  { title: 'Vamos solo a instalar', text: 'Si algo no se ve claro, coordinamos una visita técnica sin costo en Chiclayo.' },
];

export type HomeCase = {
  tag: string;
  title: string;
  photos: string;
  quotedIn: string;
  installedIn: string;
  quote: string;
  author: string;
  /** Local photo keys; missing → labelled placeholder. */
  before?: 'hero';
  after?: 'hero';
  /** Only verified cases (real client, with permission) render in production. */
  verified: boolean;
};

// TODO(Frío Norte): replace with real home cases (client permission + their photos), then set verified: true.
export const homeCases: HomeCase[] = [
  { tag: 'Departamento · Chiclayo', title: 'Sala-comedor de 35 m² en un 5.º piso', photos: '4 fotos', quotedIn: 'en 5 h', installedIn: 'en 2 días', quote: 'Mandé las fotos un domingo y el lunes ya tenía el precio y cómo iba a quedar. No tuve que faltar al trabajo para una visita.', author: 'Nombre del cliente · Santa Victoria', after: 'hero', verified: false },
  { tag: 'Casa · Lambayeque', title: 'Dos dormitorios con la unidad exterior en la azotea', photos: '6 fotos', quotedIn: 'en 8 h', installedIn: 'en 3 días', quote: 'Por la foto del tablero vieron que necesitaba un circuito aparte. Venía incluido en la cotización, sin sorpresas el día de la instalación.', author: 'Nombre del cliente · Lambayeque', verified: false },
  { tag: 'Departamento alquilado · Chiclayo', title: 'Dormitorio sin tocar la fachada del edificio', photos: '4 fotos', quotedIn: 'en 6 h', installedIn: 'en 1 día', quote: 'Con la simulación pude mostrarle a la administración cómo quedaría antes de instalar. Me aprobaron en el día.', author: 'Nombre del cliente · Chiclayo', verified: false },
];
