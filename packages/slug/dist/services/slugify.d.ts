/**
 * Returns the slug for a given string and locale.
 * If the locale belongs to a language supported by SpeakingURL, it
 * is used as the symbol language. Otherwise, the symbol language
 * is english.
 * Slug suggestions are limited to 75 characters.
 *
 * @param {string} text To be turned into a slug.
 * @param {string?} locale
 * @returns {string} Slug for provided text.
 */
export declare function slugify(text: string, locale?: string): string;
