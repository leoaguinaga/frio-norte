import { Field, Hidden, Select, serviceOptions, cityOptions } from './Field';
import { PrivacyCheck } from './PrivacyCheck';
import { useLeadSubmit } from './useLeadSubmit';

type Props = {
  title?: string;
  subtitle?: string;
  service?: string;
  product?: string;
  projectRef?: string;
  cta?: string;
  showCity?: boolean;
};

/** Compact lead form used in hero, service detail and product detail. */
export default function QuoteForm({ title = 'Cotiza en 1 minuto', subtitle, service, product, projectRef, cta = 'Solicitar cotización', showCity = false }: Props) {
  const { pending, errors, formError, submit } = useLeadSubmit();
  return (
    <form
      className="flex flex-col gap-3"
      noValidate
      onSubmit={(e) => { e.preventDefault(); submit(e.currentTarget); }}
    >
      <div className="mb-1">
        <p className="text-h4">{title}</p>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      <Hidden name="product" value={product} />
      <Hidden name="projectRef" value={projectRef} />
      {product ? <Hidden name="service" value="Instalación" /> : (
        <Select label="Servicio" name="service" defaultValue={service} options={serviceOptions} error={errors.service} />
      )}
      <Field label="Nombre" name="name" placeholder="Tu nombre" autoComplete="name" required error={errors.name} />
      <Field label="WhatsApp" name="phone" type="tel" inputMode="tel" placeholder="999 999 999" autoComplete="tel" required error={errors.phone} />
      {showCity && <Select label="Ciudad" name="city" options={cityOptions} />}
      <PrivacyCheck error={errors.privacy} />
      <button type="submit" disabled={pending} className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-white transition-[transform,opacity] duration-150 ease-out active:scale-[0.97] disabled:opacity-70">
        {pending && <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />}
        {pending ? 'Enviando…' : cta}
      </button>
      {formError && <p role="alert" className="text-caption text-red-600">{formError}</p>}
    </form>
  );
}
