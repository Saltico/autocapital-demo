// src/data/site.ts
// Single source of truth for all shared site data.
// Contact data reads from env vars (PUBLIC_CONTACT_*) with fallbacks.

import type { NavItem } from '@/types/navigation';
import type { FooterLink, SocialLink } from '@/types/layout';

// ─── Branding ────────────────────────────────────────────────────────
export const siteBrand = {
  name: import.meta.env.PUBLIC_SITE_NAME ?? 'AutoCapital',
  tagline: 'El auto que mereces, a un clic de distancia',
  description:
    'Concesionario digital en Bogotá: carros usados premium con historial verificado, compra, venta, consignación y financiación con entregas en toda Colombia.',
  logoUrl: '/logo.png',
  siteUrl: import.meta.env.PUBLIC_SITE_URL ?? 'https://autocapital.com.co',
};

// ─── Language ────────────────────────────────────────────────────────
export const siteLanguage = import.meta.env.PUBLIC_SITE_LANG ?? 'es';

// ─── Contact (from env vars, with fallbacks) ─────────────────────────
export const siteContact = {
  email: import.meta.env.PUBLIC_CONTACT_EMAIL ?? '',
  phone: import.meta.env.PUBLIC_CONTACT_PHONE ?? '',
  address: import.meta.env.PUBLIC_CONTACT_ADDRESS ?? '',
  schedule: import.meta.env.PUBLIC_CONTACT_SCHEDULE ?? '',
  mapsEmbedUrl: import.meta.env.PUBLIC_MAPS_EMBED_URL ?? '',
};

// ─── WhatsApp ────────────────────────────────────────────────────────
// Número en formato wa.me (solo dígitos, con indicativo). Deriva del teléfono.
export const whatsappNumber = (import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? siteContact.phone).replace(/\D/g, '');

/** Enlace wa.me con mensaje prellenado opcional. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Teléfono legible: +57 300 841 5421 */
export const phoneDisplay = whatsappNumber.length === 12
  ? `+${whatsappNumber.slice(0, 2)} ${whatsappNumber.slice(2, 5)} ${whatsappNumber.slice(5, 8)} ${whatsappNumber.slice(8)}`
  : siteContact.phone;

// ─── Social ──────────────────────────────────────────────────────────
export const socialLinks: SocialLink[] = [
  { platform: 'instagram', url: 'https://www.instagram.com/autocapital.co/', label: 'Instagram @autocapital.co' },
  { platform: 'whatsapp', url: whatsappLink(), label: `WhatsApp ${phoneDisplay}` },
];

// ─── Navigation ──────────────────────────────────────────────────────
export const navigationData: NavItem[] = [
  { label: 'Catálogo', url: '/catalogo' },
  { label: 'Vender', url: '/vende-tu-carro' },
  { label: 'Consignación', url: '/consignacion' },
  { label: 'Financiación', url: '/financiacion' },
  { label: 'Quiénes somos', url: '/#quienes-somos' },
];

// ─── Footer ──────────────────────────────────────────────────────────
export const footerData: { services: FooterLink[]; legal: FooterLink[] } = {
  services: [
    { label: 'Catálogo de carros', url: '/catalogo' },
    { label: 'Vende tu carro', url: '/vende-tu-carro' },
    { label: 'Consignación', url: '/consignacion' },
    { label: 'Financiación', url: '/financiacion' },
  ],
  legal: [
    { label: 'Política de privacidad', url: 'https://autocapital.com.co/politica-de-privacidad/' },
    { label: 'Tratamiento de datos', url: 'https://autocapital.com.co/abeas-data/' },
  ],
};
