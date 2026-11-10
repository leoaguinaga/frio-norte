/**
 * Contralio CRM client.
 * Endpoints are assumptions until Contralio shares its API contract:
 *   POST {CONTRALIO_API_URL}/leads            → { id }
 *   GET  {CONTRALIO_API_URL}/projects?published=true → Project[]
 * Without CONTRALIO_API_URL, leads are logged and projects fall back to mock data.
 */
import { mockProjects } from './mock-projects';

export type Lead = {
  name: string;
  phone: string;
  email?: string;
  segment?: 'hogar' | 'empresa' | 'industria';
  service?: string;
  product?: string;
  /** BTU/h chosen for the product, if any. */
  capacity?: number;
  projectRef?: string;
  city?: string;
  area?: number;
  message?: string;
  source: { page: string; utm?: Record<string, string> };
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  client: string;
  sector: string;
  city: string;
  year: number;
  services: string[];
  system: string;
  summary: string;
  challenge?: string;
  solution?: string;
  cover?: string;
  gallery?: string[];
};

const API = import.meta.env.CONTRALIO_API_URL as string | undefined;
const KEY = import.meta.env.CONTRALIO_API_KEY as string | undefined;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}`, ...init?.headers },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Contralio ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

export async function createLead(lead: Lead): Promise<{ id: string }> {
  if (!API) {
    console.info('[contralio:mock] lead', lead);
    return { id: `FN-${Date.now().toString(36).toUpperCase()}` };
  }
  return request<{ id: string }>('/leads', { method: 'POST', body: JSON.stringify(lead) });
}

let cache: Project[] | undefined;
/** Called at build time; a Contralio webhook should trigger a rebuild when projects change. */
export async function getProjects(): Promise<Project[]> {
  if (cache) return cache;
  if (!API) return (cache = mockProjects);
  try {
    cache = await request<Project[]>('/projects?published=true');
  } catch (err) {
    console.warn('[contralio] projects unavailable, using mock data', err);
    cache = mockProjects;
  }
  return cache;
}

export const getProject = async (slug: string) => (await getProjects()).find((p) => p.slug === slug);
