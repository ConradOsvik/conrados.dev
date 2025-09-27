export type Locale = (typeof locales)[number]

export const locales = ['en', 'no'] as const
export const defaultLocale: Locale = 'en'
