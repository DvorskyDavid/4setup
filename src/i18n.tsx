import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'

export type Lang = 'en' | 'cz'

type Dictionary = Record<string, Record<Lang, string>>

const DICT: Dictionary = {
  'nav.setups': { en: 'Setups', cz: 'Setupy' },
  'nav.blog': { en: 'Blog', cz: 'Blog' },
  'nav.store': { en: 'Store', cz: 'Obchod' },
  'nav.contact': { en: 'Contact us', cz: 'Kontaktujte nás' },

  'hero.title': { en: 'Premium Gaming Setups', cz: 'Prémiové herní sestavy' },
  'hero.subtitle': {
    en: 'Custom PCs, ergonomic desks, ambient lighting, and pro peripherals configured for peak performance.',
    cz: 'Vlastní PC, ergonomické stoly, ambientní osvětlení a profi periferie pro maximální výkon.'
  },
  'hero.getQuote': { en: 'Get a Quote', cz: 'Nezávazná poptávka' },
  'hero.explore': { en: 'Explore Setups', cz: 'Prozkoumat sestavy' },

  'feature.pcs.title': { en: 'Power PCs', cz: 'Výkonné PC' },
  'feature.pcs.desc': { en: 'Air or liquid-cooled builds curated for FPS stability and thermals.', cz: 'Vzduchem či vodou chlazené sestavy pro stabilní FPS a teploty.' },
  'feature.desks.title': { en: 'Pro Desks', cz: 'Profesionální stoly' },
  'feature.desks.desc': { en: 'Height-adjustable, cable-managed, and purpose-lit workspace ergonomics.', cz: 'Výškově nastavitelné, kabelově čisté a osvětlené pracovní prostory.' },
  'feature.lights.title': { en: 'Immersive Lighting', cz: 'Pohlcující osvětlení' },
  'feature.lights.desc': { en: 'RGB scenes synced to gameplay and environment for total immersion.', cz: 'RGB scény synchronizované s hrou i prostředím pro maximální ponor.' },

  'page.setups.title': { en: 'Setups', cz: 'Setupy' },
  'page.setups.desc': { en: 'Explore curated builds, desks, and lighting packages. More coming soon.', cz: 'Prozkoumejte sestavy, stoly a balíčky osvětlení. Již brzy více.' },
  'page.blog.title': { en: 'Blog', cz: 'Blog' },
  'page.blog.desc': { en: 'Guides and inspiration for performance setups and immersive spaces.', cz: 'Návody a inspirace pro výkonné sestavy a pohlcující prostředí.' },
  'page.contact.title': { en: 'Contact', cz: 'Kontakt' },
  'page.contact.desc': { en: 'Email us at hello@4setup.cz or use the form (coming soon).', cz: 'Napište nám na hello@4setup.cz nebo použijte formulář (již brzy).' },
}

type I18nContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: keyof typeof DICT) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function detectInitial(): Lang {
  if (typeof window === 'undefined') return 'en'
  const saved = window.localStorage.getItem('lang') as Lang | null
  if (saved === 'en' || saved === 'cz') return saved

  // Prefer explicit Czech language from browser settings
  const langs = Array.isArray((navigator as any).languages)
    ? ((navigator as any).languages as string[]).map((l) => l.toLowerCase())
    : []
  const primary = (navigator.language || '').toLowerCase()
  const all = [primary, ...langs]
  if (all.some((l) => l.startsWith('cs') || l.startsWith('cz'))) return 'cz'
  if (all.some((l) => /-cz\b/.test(l))) return 'cz'

  // Fallback: infer by time zone (covers Czechia if system is set correctly)
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (tz && tz.toLowerCase() === 'europe/prague') return 'cz'
  } catch {}

  return 'en'
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitial())

  useEffect(() => {
    try { window.localStorage.setItem('lang', lang) } catch {}
  }, [lang])

  const setLang = (l: Lang) => setLangState(l)

  const t = useMemo(() => {
    return (key: keyof typeof DICT) => DICT[key]?.[lang] ?? String(key)
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

export function useT() {
  return useI18n().t
}


