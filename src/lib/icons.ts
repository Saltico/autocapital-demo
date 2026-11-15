// src/lib/icons.ts
// Icon name → SVG import map for Icon.astro component.
// Add new icons here as needed.

import menu from '@/assets/icons/menu.svg?raw';
import close from '@/assets/icons/close.svg?raw';
import arrowRight from '@/assets/icons/arrow-right.svg?raw';
import arrowLeft from '@/assets/icons/arrow-left.svg?raw';

export const iconMap = {
  menu,
  close,
  'arrow-right': arrowRight,
  'arrow-left': arrowLeft,
} as const;

export type IconName = keyof typeof iconMap;
