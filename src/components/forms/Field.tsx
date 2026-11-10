import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

const control = 'w-full rounded-[14px] border border-line bg-surface px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] duration-150 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 aria-[invalid=true]:border-red-500';

type Base = { label: string; name: string; error?: string };

export function Field({ label, name, error, ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-caption text-ink">{label}</span>
      <input name={name} className={control} aria-invalid={!!error} {...rest} />
      {error && <span className="text-caption text-red-600">{error}</span>}
    </label>
  );
}

export function Select({ label, name, error, options, ...rest }: Base & { options: { value: string; label: string }[] } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-caption text-ink">{label}</span>
      <select name={name} className={control} aria-invalid={!!error} {...rest}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <span className="text-caption text-red-600">{error}</span>}
    </label>
  );
}

export function TextArea({ label, name, error, ...rest }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-caption text-ink">{label}</span>
      <textarea name={name} rows={3} className={control} aria-invalid={!!error} {...rest} />
      {error && <span className="text-caption text-red-600">{error}</span>}
    </label>
  );
}

export function Hidden({ name, value }: { name: string; value?: string }) {
  return value ? <input type="hidden" name={name} value={value} /> : null;
}

export const serviceOptions = [
  { value: 'Instalación', label: 'Instalación de equipo' },
  { value: 'Mantenimiento preventivo', label: 'Mantenimiento preventivo' },
  { value: 'Mantenimiento correctivo', label: 'Reparación / correctivo' },
  { value: 'Asesoría de proyectos', label: 'Proyecto para empresa' },
];
export const cityOptions = ['Chiclayo', 'Piura', 'Trujillo', 'Cajamarca', 'Lambayeque', 'Otra'].map((c) => ({ value: c, label: c }));
