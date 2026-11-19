import { useEffect, useRef, useState } from 'react';
import { compressImage } from '../../lib/compress-image';

export type Slot = { id: string; label: string; hint: string };
export type Photo = { file: File; url: string };

/** Guided shots: what a technician needs to quote without visiting. */
export function slotsFor(service: string): Slot[] {
  if (service.startsWith('Mantenimiento')) {
    return [
      { id: 'equipo', label: 'Tu equipo actual', hint: 'La unidad interior completa, de frente' },
      { id: 'placa', label: 'Etiqueta del equipo', hint: 'La placa con marca y modelo (al costado)' },
      { id: 'exterior', label: 'Unidad exterior', hint: 'Que se vea dónde y cómo está instalada' },
      { id: 'problema', label: 'El problema (opcional)', hint: 'Goteo, hielo, código de error…' },
    ];
  }
  return [
    { id: 'pared', label: 'Pared donde irá el equipo', hint: 'De frente, que se vea del piso al techo' },
    { id: 'ambiente', label: 'El ambiente completo', hint: 'Desde la puerta, para ver el tamaño' },
    { id: 'exterior', label: 'Lugar para la unidad exterior', hint: 'Azotea, balcón, patio o fachada' },
    { id: 'electrico', label: 'Tablero eléctrico', hint: 'Con la tapa abierta, si se puede' },
  ];
}

type Props = { slots: Slot[]; photos: Record<string, Photo>; onChange: (next: Record<string, Photo>) => void };

export function PhotoSlots({ slots, photos, onChange }: Props) {
  const [busy, setBusy] = useState<string>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const latest = useRef(photos);
  latest.current = photos;

  // Free preview URLs when the stepper unmounts.
  useEffect(() => () => Object.values(latest.current).forEach((p) => URL.revokeObjectURL(p.url)), []);

  async function pick(slot: string, file?: File) {
    if (!file) return;
    setBusy(slot);
    setErrors((e) => ({ ...e, [slot]: '' }));
    try {
      const small = await compressImage(file, slot);
      const prev = latest.current[slot];
      if (prev) URL.revokeObjectURL(prev.url);
      onChange({ ...latest.current, [slot]: { file: small, url: URL.createObjectURL(small) } });
    } catch {
      setErrors((e) => ({ ...e, [slot]: 'No pudimos leer esta foto. Prueba con otra o en formato JPG.' }));
    } finally {
      setBusy(undefined);
    }
  }

  function remove(slot: string) {
    const { [slot]: gone, ...rest } = latest.current;
    if (gone) URL.revokeObjectURL(gone.url);
    onChange(rest);
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {slots.map((s) => {
        const photo = photos[s.id];
        return (
          <div key={s.id} className="flex flex-col gap-1.5">
            <div className="relative">
              <label
                className={`group flex cursor-pointer items-center gap-4 overflow-hidden rounded-[18px] border p-3 transition-[border-color,box-shadow] focus-within:ring-4 focus-within:ring-primary/15 ${photo ? 'border-ink ring-1 ring-ink' : 'border-dashed border-line hover:border-ink/40'}`}
              >
                <input type="file" accept="image/*" className="sr-only" onChange={(e) => { pick(s.id, e.target.files?.[0]); e.target.value = ''; }} />
                <span className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-canvas text-muted">
                  {busy === s.id ? (
                    <span className="size-5 animate-spin rounded-full border-2 border-line border-t-ink" aria-hidden="true" />
                  ) : photo ? (
                    <img src={photo.url} alt="" className="size-full object-cover" />
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" />
                    </svg>
                  )}
                </span>
                <span className="flex min-w-0 flex-col pr-6">
                  <span className="text-label">{s.label}</span>
                  <span className="text-sm text-muted">{photo ? 'Toca para cambiarla' : s.hint}</span>
                </span>
              </label>
              {photo && (
                <button type="button" onClick={() => remove(s.id)} aria-label={`Quitar foto: ${s.label}`} className="absolute right-2 top-2 grid size-7 place-items-center rounded-full text-muted hover:bg-canvas hover:text-ink">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
                </button>
              )}
            </div>
            {errors[s.id] && <span className="text-caption text-red-600">{errors[s.id]}</span>}
          </div>
        );
      })}
    </div>
  );
}
