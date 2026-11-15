// src/lib/motion.ts
// Movimiento ligado al scroll, sin dependencias:
//  - [data-parallax="0.28"]: capa de fondo que se desplaza más lento que el contenido.
//  - [data-progress]: lista de pasos cuya línea se llena al recorrerla.
//  - [data-preview-list]: vista previa de foto que sigue al cursor (solo puntero fino).
// Con prefers-reduced-motion no se mueve nada; los pasos quedan todos activos.

const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export function initMotion() {
  const layers = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  const progress = Array.from(document.querySelectorAll<HTMLElement>('[data-progress]'));

  if (reduce()) {
    progress.forEach((p) => {
      p.style.setProperty('--fill', '1');
      p.querySelectorAll('[data-progress-item]').forEach((i) => i.classList.add('is-active'));
    });
    return;
  }

  let ticking = false;
  const frame = () => {
    ticking = false;
    const vh = window.innerHeight;

    for (const el of layers) {
      const box = (el.parentElement ?? el).getBoundingClientRect();
      if (box.bottom < -50 || box.top > vh + 50) continue;
      const speed = Number(el.dataset.parallax) || 0.25;
      // Reposo (y = 0): un hero arriba de la página sin scroll; una banda, centrada en pantalla.
      const isTop = box.top + window.scrollY < vh * 0.5;
      const y = (isTop ? window.scrollY : vh / 2 - (box.top + box.height / 2)) * speed;
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    }

    for (const list of progress) {
      const r = list.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) continue;
      const p = clamp((vh * 0.85 - r.top) / (vh * 0.55 + r.height * 0.35));
      list.style.setProperty('--fill', p.toFixed(3));
      const items = list.querySelectorAll<HTMLElement>('[data-progress-item]');
      items.forEach((it, i) => it.classList.toggle('is-active', p >= (i + 0.35) / items.length));
    }
  };
  const request = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  };
  if (layers.length || progress.length) {
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    frame();
  }

  initPreview();
}

/** Foto flotante que acompaña al cursor sobre una lista de enlaces. */
function initPreview() {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)');
  document.querySelectorAll<HTMLElement>('[data-preview-list]').forEach((list) => {
    const box = list.querySelector<HTMLElement>('[data-preview]');
    if (!box) return;
    const frames = Array.from(box.querySelectorAll<HTMLElement>('[data-preview-frame]'));
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0, active = false;

    const loop = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      box.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 || active ? requestAnimationFrame(loop) : 0;
    };
    const place = (e: PointerEvent) => {
      const r = list.getBoundingClientRect();
      tx = e.clientX - r.left + 28;
      ty = e.clientY - r.top - box.offsetHeight / 2;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    list.querySelectorAll<HTMLElement>('[data-preview-key]').forEach((item) => {
      item.addEventListener('pointerenter', (e) => {
        if (!fine.matches) return;
        if (!active) {
          const r = list.getBoundingClientRect();
          x = tx = e.clientX - r.left + 28;
          y = ty = e.clientY - r.top - box.offsetHeight / 2;
        }
        active = true;
        const key = item.dataset.previewKey;
        frames.forEach((f) => f.classList.toggle('is-current', f.dataset.previewFrame === key));
        box.classList.add('is-on');
        place(e);
      });
    });
    list.addEventListener('pointermove', (e) => active && place(e));
    list.addEventListener('pointerleave', () => {
      active = false;
      box.classList.remove('is-on');
    });
  });
}
