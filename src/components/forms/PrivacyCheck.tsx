export function PrivacyCheck({ error }: { error?: string }) {
  return (
    <label className="flex items-center gap-2.5 text-caption text-muted">
      <input type="checkbox" name="privacy" required className="size-4 shrink-0 accent-[var(--color-primary)]" />
      <span>Acepto la <a href="/privacidad" className="underline hover:text-primary">política de privacidad</a>.{error && <span className="block text-red-600">{error}</span>}</span>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
    </label>
  );
}
