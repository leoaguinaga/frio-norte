import type { Project } from './contralio';

const p = (id: number, slug: string, title: string, client: string, sector: string, city: string, year: number, system: string, summary: string, services = ['Instalación']): Project =>
  ({ id: String(id), slug, title, client, sector, city, year, system, summary, services });

export const mockProjects: Project[] = [
  { ...p(1, 'caja-piura-sede-trujillo', 'Caja Piura — Sede Trujillo', 'Caja Piura', 'Banca', 'Trujillo', 2020, 'Multi V · Presurización', 'Climatización integral de un edificio de 5 pisos.', ['Asesoría', 'Instalación']),
    challenge: 'Una sede nueva con atención al público en 5 pisos que necesitaba confort uniforme, renovación de aire y seguridad en escaleras, sin interrumpir la obra civil.',
    solution: 'Diseñamos e instalamos un sistema LG Multi V con unidades interiores tipo cassette y ducto, presurización de escaleras y extracción de monóxido en el sótano.' },
  p(2, 'sunarp-chiclayo', 'SUNARP Chiclayo', 'SUNARP', 'Sector público', 'Chiclayo', 2021, 'Cassette', 'Instalación de equipos tipo cassette en oficinas.'),
  p(3, 'agricola-alaya', 'Agrícola Alaya', 'Agrícola Alaya', 'Agroindustria', 'Olmos', 2021, 'Split pared', 'Mantenimiento preventivo en el campamento.', ['Mantenimiento preventivo']),
  p(4, 'edificio-claro-san-isidro', 'Edificio Claro San Isidro', 'Claro', 'Telecom', 'Lima', 2019, 'Ductos y extracción', 'Equipos tipo ducto, ductería galvanizada y presurización.'),
  p(5, 'utp-chiclayo', 'UTP Chiclayo', 'UTP', 'Educación', 'Chiclayo', 2018, 'Multi V en aulas', 'Sistemas Multi V en aulas de la universidad.'),
  p(6, 'essalud-tacna', 'EsSalud Tacna', 'EsSalud', 'Salud', 'Tacna', 2014, 'Sistema integral', 'Sistema integral de aire acondicionado.'),
];
