// src/lib/waForm.ts
// Formularios sin backend: al enviar, arma un mensaje con los campos y abre
// WhatsApp (wa.me) con el texto prellenado. Marcado:
//   <form data-wa-form data-wa-number="57..." data-wa-intro="Hola, quiero ...">
//   campos con name + data-label (o <label for>)
//   <p data-wa-status hidden></p>

function labelFor(form: HTMLFormElement, el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): string {
  if (el.dataset.label) return el.dataset.label;
  const lbl = el.id ? form.querySelector<HTMLLabelElement>(`label[for="${el.id}"]`) : null;
  return (lbl?.textContent ?? el.name).replace(/\s*\(opcional\)\s*/i, '').trim();
}

export function buildMessage(form: HTMLFormElement): string {
  const lines: string[] = [form.dataset.waIntro ?? 'Hola AutoCapital.'];
  const seen = new Set<string>();
  form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea').forEach((el) => {
    if (!el.name || el.type === 'checkbox' || el.type === 'hidden' || el.dataset.skip !== undefined) return;
    if (el.type === 'radio' && !(el as HTMLInputElement).checked) return;
    if (seen.has(el.name)) return;
    const value = el.dataset.display ?? (el instanceof HTMLSelectElement ? el.selectedOptions[0]?.text : el.value);
    if (!value || !String(value).trim() || (el instanceof HTMLSelectElement && el.value === '')) return;
    seen.add(el.name);
    lines.push(`• ${labelFor(form, el)}: ${String(value).trim()}`);
  });
  return lines.join('\n');
}

export function initWaForms(root: ParentNode = document) {
  root.querySelectorAll<HTMLFormElement>('form[data-wa-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const number = form.dataset.waNumber ?? '';
      const url = `https://wa.me/${number}?text=${encodeURIComponent(buildMessage(form))}`;
      window.open(url, '_blank', 'noopener');
      const status = form.querySelector<HTMLElement>('[data-wa-status]');
      if (status) {
        status.hidden = false;
        status.textContent = 'Listo: abrimos WhatsApp con tu mensaje. Solo tienes que enviarlo.';
      }
    });
  });
}
