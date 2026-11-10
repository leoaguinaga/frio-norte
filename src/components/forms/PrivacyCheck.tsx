export function PrivacyCheck({ error }: { error?: string }) {
  return (
    <label className="flex items-start gap-2.5 text-caption text-muted">
      <input type="checkbox" name="privacy" required className="mt-0.5 size-4 accent-[var(--color-primary)]" />
      <span>Acepto la <a href="/privacidad" className="underline hover:text-primary">política de privacidad</a>.{error && <span className="block text-red-600">{error}</span>}</span>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
    </label>
  );
}
