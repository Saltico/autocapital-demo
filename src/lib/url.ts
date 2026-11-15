// src/lib/url.ts
// Prefija rutas internas con BASE_URL (necesario en GitHub Pages, donde el sitio
// vive bajo /<repo>/). URLs externas, anclas y tel:/mailto: pasan intactas.

const BASE = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '');

export function href(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return BASE + path;
}

export function stripBase(pathname: string): string {
  if (BASE && (pathname === BASE || pathname.startsWith(BASE + '/'))) {
    return pathname.slice(BASE.length) || '/';
  }
  return pathname;
}

/** $102.800.000 */
export const formatCOP = (n: number) =>
  '$' + Math.round(n).toLocaleString('es-CO', { maximumFractionDigits: 0 });

/** 42.300 km */
export const formatKm = (n: number) => n.toLocaleString('es-CO') + ' km';
