import { en } from './en';
import { pcm } from './pcm';
import { ha } from './ha';
import { yo } from './yo';
import { ig } from './ig';

export const translations = {
  en,
  pcm,
  ha,
  yo,
  ig,
} as const;

export type TranslationKeys = keyof typeof translations;
export type TranslationsType = typeof en;

// Helper type to get nested keys
export type NestedKeys<T> = {
  [K in keyof T]: T[K] extends object
    ? `${K & string}.${NestedKeys<T[K]> & string}`
    : K;
}[keyof T];

export type TranslationKey = NestedKeys<TranslationsType>; 