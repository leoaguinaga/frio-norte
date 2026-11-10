// Central lookup for local photography. Missing files return undefined → Photo shows a placeholder.
import type { ImageMetadata } from 'astro';
import hero from '../assets/images/hero/hero.jpg';
import openUnit from '../assets/images/maintenance/unidad-abierta.jpg';
import team from '../assets/images/about/equipo.jpg';

type Mod = { default: ImageMetadata };
const services = import.meta.glob<Mod>('../assets/images/services/*.jpg', { eager: true });
const products = import.meta.glob<Mod>('../assets/images/products/*.png', { eager: true });
// Provisional project photos until Contralio sends real covers (`project.cover`).
const projects = import.meta.glob<Mod>('../assets/images/projects/*.jpg', { eager: true });
const find = (mods: Record<string, Mod>, file: string) => Object.entries(mods).find(([k]) => k.endsWith(`/${file}`))?.[1].default;

export const images = { hero, openUnit, team };
export const serviceImage = (slug: string) => find(services, `${slug}.jpg`);
export const productImage = (slug: string) => find(products, `${slug}.png`);
export const projectImage = (slug: string) => find(projects, `${slug}.jpg`);
export const projectGallery = (slug: string) => [1, 2, 3].map((n) => find(projects, `${slug}-${n}.jpg`));
