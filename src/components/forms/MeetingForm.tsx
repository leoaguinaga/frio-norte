import { Field, Select, cityOptions } from './Field';
import { PrivacyCheck } from './PrivacyCheck';
import { useLeadSubmit } from './useLeadSubmit';
import { monthlyUnitOptions, preferredTimeOptions } from '../../data/mayoristas';

/** Booking form for the wholesale strategy meeting (/mayoristas). Sent to Contralio as an "empresa" lead. */
export default function MeetingForm() {
  const { pending, errors, formError, submit } = useLeadSubmit();
  return (
    <form
      id="agendar"
      className="flex scroll-mt-28 flex-col gap-3"
      noValidate
      onSubmit={(e) => { e.preventDefault(); submit(e.currentTarget); }}
    >
      <div className="mb-1">
        <p className="text-h3">Agenda tu reunión</p>
        <p className="mt-1 text-sm text-muted">Te confirmamos fecha y hora por WhatsApp en menos de 24 horas.</p>
      </div>
      <input type="hidden" name="segment" value="empresa" />
      <input type="hidden" name="service" value="Mayorista · reunión estratégica" />
      <Field label="Nombre y apellido" name="name" placeholder="Tu nombre" autoComplete="name" required error={errors.name} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Empresa" name="businessName" placeholder="Razón social" autoComplete="organization" required error={errors.businessName} />
        <Field label="RUC" name="ruc" inputMode="numeric" maxLength={11} placeholder="20XXXXXXXXX" error={errors.ruc} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Select label="Ciudad" name="city" options={cityOptions} />
        <Field label="WhatsApp" name="phone" type="tel" inputMode="tel" placeholder="999 999 999" autoComplete="tel" required error={errors.phone} />
      </div>
      <Select label="Equipos que instalas al mes (aprox.)" name="monthlyUnits" options={monthlyUnitOptions} defaultValue="10 a 30 equipos" />
      <Select label="Horario preferido" name="preferredTime" options={preferredTimeOptions} />
      <PrivacyCheck error={errors.privacy} />
      <button type="submit" disabled={pending} className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-white transition-[transform,opacity] duration-150 ease-out active:scale-[0.97] disabled:opacity-70">
        {pending && <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />}
        {pending ? 'Enviando…' : 'Agendar reunión estratégica'}
      </button>
      {formError && <p role="alert" className="text-caption text-red-600">{formError}</p>}
    </form>
  );
}
