import { useRef, useState } from 'react';
import { Field, Hidden, Select, TextArea, serviceOptions, cityOptions } from './Field';
import { PrivacyCheck } from './PrivacyCheck';
import { useLeadSubmit } from './useLeadSubmit';
import { PhotoSlots, slotsFor, type Photo } from './PhotoSlots';

const steps = ['Necesidad', 'Espacio', 'Fotos', 'Contacto'] as const;
const last = steps.length - 1;
const segments = [
  { value: 'hogar', label: 'Hogar', hint: 'Dormitorio, sala' },
  { value: 'empresa', label: 'Oficina / comercio', hint: 'Hasta 1,500 m³' },
  { value: 'industria', label: 'Industria / edificio', hint: 'Proyecto a medida' },
];

export type EquipmentOption = { slug: string; name: string; capacities: number[] };
type Props = { service?: string; product?: string; productName?: string; projectRef?: string; equipment: EquipmentOption[] };

/** /cotizar: 4-step form. All steps stay mounted so FormData includes every field. */
export default function QuoteStepper({ service, product, projectRef, equipment }: Props) {
  const [step, setStep] = useState(0);
  const [svc, setSvc] = useState(product ? 'Instalación' : service ?? 'Instalación');
  const [model, setModel] = useState(product ?? '');
  const capacities = equipment.find((e) => e.slug === model)?.capacities ?? [];
  const [photos, setPhotos] = useState<Record<string, Photo>>({});
  const slots = slotsFor(svc);
  const photoFiles = slots.flatMap((s) => (photos[s.id] ? [photos[s.id].file] : []));
  const isMaintenance = svc.startsWith('Mantenimiento');
  const [dir, setDir] = useState<1 | -1>(1);
  const formRef = useRef<HTMLFormElement>(null);
  const { pending, errors, formError, submit } = useLeadSubmit();

  const go = (to: number) => {
    // Validate visible fields before moving forward.
    if (to > step) {
      const panel = formRef.current?.querySelector<HTMLElement>(`[data-step="${step}"]`);
      const invalid = panel?.querySelector<HTMLInputElement>(':invalid');
      if (invalid) return invalid.reportValidity();
    }
    setDir(to > step ? 1 : -1);
    setStep(to);
  };

  const panel = (i: number) => ({
    'data-step': i,
    hidden: step !== i,
    className: 'flex flex-col gap-5 motion-safe:animate-[step-in_320ms_var(--ease-out-strong)]',
    style: { ['--from' as string]: `${dir * 24}px` },
  });

  return (
    <form ref={formRef} noValidate={step < last} onSubmit={(e) => { e.preventDefault(); step < last ? go(step + 1) : submit(e.currentTarget, photoFiles); }} className="flex flex-col gap-7">
      <ol className="grid grid-cols-4 gap-2" aria-label="Progreso">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-col gap-2">
            <span className={`h-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-ink' : 'bg-line'}`} />
            <span className={`text-caption ${i <= step ? 'text-ink' : 'text-muted'}`} aria-current={i === step ? 'step' : undefined}>{i + 1} · {s}</span>
          </li>
        ))}
      </ol>
      <Hidden name="projectRef" value={projectRef} />

      <div {...panel(0)}>
        <p className="text-h3">¿Dónde se instalará?</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {segments.map((s, i) => (
            <label key={s.value} className="cursor-pointer rounded-[18px] border border-line bg-surface p-4 transition-[border-color,box-shadow] has-[:checked]:border-ink has-[:checked]:ring-1 has-[:checked]:ring-ink">
              <input type="radio" name="segment" value={s.value} defaultChecked={i === 0} className="sr-only" />
              <span className="block text-label">{s.label}</span>
              <span className="text-sm text-muted">{s.hint}</span>
            </label>
          ))}
        </div>
        <Select label="¿Qué necesitas?" name="service" value={svc} onChange={(e) => setSvc(e.target.value)} options={serviceOptions} />
        {svc === 'Instalación' && (
          <div className="grid gap-3 sm:grid-cols-[1fr_200px]">
            <Select
              label="Equipo"
              name="product"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              options={[{ value: '', label: 'Que me recomienden' }, ...equipment.map((e) => ({ value: e.slug, label: e.name }))]}
            />
            <Select
              label="Capacidad"
              name="capacity"
              disabled={!capacities.length}
              options={capacities.length ? capacities.map((c) => ({ value: String(c), label: `${c.toLocaleString('en-US')} BTU` })) : [{ value: '', label: 'Según el espacio' }]}
            />
          </div>
        )}
      </div>

      <div {...panel(1)}>
        <p className="text-h3">Cuéntanos del espacio</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Volumen aproximado (m³)" name="volume" type="number" min={1} inputMode="numeric" placeholder="300" error={errors.volume} />
          <Select label="Ciudad" name="city" options={cityOptions} />
        </div>
        <TextArea label="Comentarios (opcional)" name="message" placeholder="Ej: oficinas en 2do piso, ya tenemos ductos…" />
      </div>

      <div {...panel(2)}>
        <div className="flex flex-col gap-2">
          <p className="text-h3">Envíanos unas fotos</p>
          <p className="text-muted">
            {isMaintenance
              ? 'Con estas fotos diagnosticamos antes de ir y llegamos con los repuestos correctos.'
              : 'Con estas fotos te cotizamos sin esperar la visita y te enviamos una simulación de cómo quedaría el equipo.'}
          </p>
        </div>
        <PhotoSlots slots={slots} photos={photos} onChange={setPhotos} />
        <p className="text-caption text-muted">
          ¿No sabes cómo tomarlas? <a href="#guia-fotos" className="text-primary underline-offset-2 hover:underline">Mira la guía de fotos</a>. Si prefieres, puedes saltar este paso y coordinamos una visita técnica.
        </p>
      </div>

      <div {...panel(3)}>
        <p className="text-h3">¿A dónde te enviamos la cotización?</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nombre" name="name" required autoComplete="name" placeholder="Tu nombre" error={errors.name} />
          <Field label="WhatsApp" name="phone" type="tel" required autoComplete="tel" placeholder="999 999 999" error={errors.phone} />
        </div>
        <Field label="Correo (opcional)" name="email" type="email" autoComplete="email" placeholder="tu@empresa.com" error={errors.email} />
        <PrivacyCheck error={errors.privacy} />
      </div>

      <div className="flex items-center justify-between">
        {step > 0 ? <button type="button" onClick={() => go(step - 1)} className="text-label text-muted hover:text-ink">← Atrás</button> : <span />}
        <button type="submit" disabled={pending} className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[15px] font-medium text-white transition-transform duration-150 ease-out active:scale-[0.97] disabled:opacity-70">
          {pending && <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />}
          {step === 2 && !photoFiles.length ? 'Continuar sin fotos' : step < last ? 'Continuar' : pending ? 'Enviando…' : 'Solicitar cotización'}
        </button>
      </div>
      {formError && <p role="alert" className="text-caption text-red-600">{formError}</p>}
    </form>
  );
}
