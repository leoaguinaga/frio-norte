export type InstallType = 'split' | 'cassette' | 'techo' | 'ventana' | 'portatil' | 'vrf' | 'cortina';
export type Product = {
  slug: string;
  name: string;
  brand: 'LG' | 'Daikin' | 'York' | 'Innovair';
  type: InstallType;
  mode: 'Solo frío' | 'Frío / Calor';
  summary: string;
  capacities: number[]; // BTU/h
  /** Price in soles from the smallest capacity, installation included. null = "a consultar". */
  price: number | null;
  featured?: { badge: string; seer: number; db: number; area: string; savings: number };
  specs: [string, string][];
};

export const installTypes: { id: InstallType; label: string; use: string }[] = [
  { id: 'split', label: 'Split pared', use: 'Dormitorios, salas y oficinas pequeñas' },
  { id: 'cassette', label: 'Cassette', use: 'Oficinas y comercios con techo falso' },
  { id: 'techo', label: 'Techo suspendido', use: 'Salones amplios, restaurantes, aulas' },
  { id: 'ventana', label: 'Ventana', use: 'Ambientes sin espacio para split' },
  { id: 'portatil', label: 'Portátil', use: 'Sin obra ni instalación' },
  { id: 'vrf', label: 'Multi V / VRF', use: 'Edificios, clínicas, hoteles' },
];

// TODO(Frío Norte): confirm models, specs and prices.
export const products: Product[] = [
  { slug: 'lg-artcool-smart', name: 'LG Artcool Smart', brand: 'LG', type: 'split', mode: 'Frío / Calor', summary: 'Espejo negro, Wi-Fi y Dual Inverter. El favorito para salas y gerencias.', capacities: [12000, 18000], price: null,
    featured: { badge: 'Más vendido', seer: 22, db: 19, area: '15–30', savings: 60 },
    specs: [['Tecnología', 'Dual Inverter'], ['Refrigerante', 'R-32'], ['Conectividad', 'Wi-Fi · LG ThinQ'], ['Voltaje', '220 V / 60 Hz'], ['Garantía', '5 años compresor · 1 año general']] },
  { slug: 'lg-dualcool', name: 'LG Dualcool Inverter', brand: 'LG', type: 'split', mode: 'Solo frío', summary: 'La mejor relación precio–ahorro para hogares y oficinas.', capacities: [12000, 18000, 24000], price: null,
    featured: { badge: 'Mejor ahorro', seer: 20, db: 21, area: '15–40', savings: 70 },
    specs: [['Tecnología', 'Dual Inverter'], ['Refrigerante', 'R-32'], ['Voltaje', '220 V / 60 Hz'], ['Garantía', '5 años compresor']] },
  { slug: 'lg-cassette-4-vias', name: 'LG Cassette 4 vías', brand: 'LG', type: 'cassette', mode: 'Frío / Calor', summary: 'Se integra al techo falso y reparte el aire de forma uniforme.', capacities: [18000, 24000, 36000, 48000], price: null,
    featured: { badge: 'Para empresas', seer: 16, db: 32, area: '30–80', savings: 45 },
    specs: [['Tecnología', 'Inverter'], ['Distribución', '4 vías'], ['Voltaje', '220 V / 60 Hz']] },
  { slug: 'lg-techo-suspendido', name: 'LG Techo Suspendido', brand: 'LG', type: 'techo', mode: 'Frío / Calor', summary: 'Diseño en V y panel negro para salones amplios.', capacities: [18000, 24000, 36000, 60000], price: null, specs: [['Tecnología', 'Inverter']] },
  { slug: 'daikin-split-inverter', name: 'Daikin Split Inverter', brand: 'Daikin', type: 'split', mode: 'Solo frío', summary: 'Silencioso y eficiente.', capacities: [9000, 12000, 18000, 24000], price: null, specs: [['Tecnología', 'Inverter']] },
  { slug: 'york-split-inverter', name: 'York Split Inverter', brand: 'York', type: 'split', mode: 'Solo frío', summary: 'Confort y bienestar con respaldo York.', capacities: [12000, 18000, 24000], price: null, specs: [['Tecnología', 'Inverter']] },
  { slug: 'lg-ventana-dual-inverter', name: 'LG Ventana Dual Inverter', brand: 'LG', type: 'ventana', mode: 'Solo frío', summary: 'Con Wi-Fi y hasta 25% de ahorro.', capacities: [12000], price: null, specs: [['Conectividad', 'Wi-Fi']] },
  { slug: 'lg-portatil-smart', name: 'LG Portátil Smart', brand: 'LG', type: 'portatil', mode: 'Solo frío', summary: 'Dual Inverter sin obra ni instalación.', capacities: [14000], price: null, specs: [['Compresor', 'Dual Inverter']] },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const typeLabel = (t: InstallType) => installTypes.find((i) => i.id === t)?.label ?? 'Cortina de aire';
export const formatBtu = (n: number) => `${Math.round(n / 1000)}k`;
export const brands = [{ name: 'LG', note: 'Exclusivo norte' }, { name: 'Daikin' }, { name: 'York' }, { name: 'Innovair' }];
