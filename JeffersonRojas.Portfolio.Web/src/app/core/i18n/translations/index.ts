import { Locale } from '../locale';
import { EN_TRANSLATIONS } from './en';
import { ES_TRANSLATIONS } from './es';
import { Translations } from './translations.model';

/** Single lookup table for the site copy. Keyed by locale, exhaustively typed. */
export const TRANSLATIONS: Readonly<Record<Locale, Translations>> = {
  en: EN_TRANSLATIONS,
  es: ES_TRANSLATIONS,
};
