import { useState } from 'react';
import { actions, isInputError } from 'astro:actions';

/** Shared submit logic: sends to Contralio via the createLead action, then goes to /gracias. */
export function useLeadSubmit() {
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string>();

  async function submit(form: HTMLFormElement) {
    const data = new FormData(form);
    data.set('page', location.pathname);
    data.set('utm', new URLSearchParams([...new URLSearchParams(location.search)].filter(([k]) => k.startsWith('utm_'))).toString());
    setPending(true);
    setErrors({});
    setFormError(undefined);
    const { data: res, error } = await actions.createLead(data);
    if (error) {
      setPending(false);
      if (isInputError(error)) {
        const fields = Object.fromEntries(Object.entries(error.fields).map(([k, v]) => [k, v?.[0] ?? '']));
        setErrors(fields);
        // Surface errors on fields this form variant doesn't render.
        const visible = new Set([...form.elements].map((el) => (el as HTMLInputElement).name));
        const hidden = Object.entries(fields).filter(([k]) => !visible.has(k) || (form.elements.namedItem(k) as HTMLInputElement)?.type === 'hidden');
        if (hidden.length) setFormError('Revisa los datos e intenta de nuevo.');
      }
      else setFormError(error.message);
      return;
    }
    const name = String(data.get('name') ?? '').split(' ')[0];
    location.href = `/gracias?id=${encodeURIComponent(res.id)}&n=${encodeURIComponent(name)}`;
  }

  return { pending, errors, formError, submit };
}
