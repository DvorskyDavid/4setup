import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'

export type Lang = 'en' | 'cz'

type Dictionary = Record<string, Record<Lang, string>>

const DICT: Dictionary = {
  'nav.setups': { en: 'Setups', cz: 'Setupy' },
  'nav.blog': { en: 'Blog', cz: 'Blog' },
  'nav.eshop': { en: 'E-shop', cz: 'E-shop' },
  'nav.contact': { en: 'Contact us', cz: 'Kontaktuj nás' },
  'nav.business': { en: 'BUSINESS', cz: 'BUSINESS' },
  'nav.businessLabel': { en: 'Are you a company?', cz: 'Jste firma?' },

  'hero.title': { en: 'WE CREATE CUSTOM ROOMS!', cz: 'TVOŘÍME POKOJE NA MÍRU!' },
  'hero.subtitle': { en: 'gaming, streaming, work, learning', cz: 'gaming, streaming, práce, učení' },
  'hero.cta': { en: 'I WANT MY SETUP', cz: 'CHCI SVŮJ SETUP' },

  'process.title': { en: 'REALIZATION FROM A TO Z', cz: 'REALIZACE OD A – Z' },
  'process.step1': { en: 'IDEA', cz: 'NÁPAD' },
  'process.step2': { en: '3D DESIGN', cz: '3D NÁVRH' },
  'process.step3': { en: 'PRODUCT DELIVERY', cz: 'DODÁNÍ PRODUKTŮ' },
  'process.step4': { en: 'FINAL REALIZATION', cz: 'FINÁLNÍ REALIZACE' },

  'quality.text': { 
    en: 'WE CREATE EVERY SPACE WITH EMPHASIS ON QUALITY, DESIGN AND FUNCTIONALITY.',
    cz: 'KAŽDÝ PROSTOR TVOŘÍME S DŮRAZEM NA KVALITU, DESIGN A FUNKČNOST.'
  },

  'podcast.title': { en: '4SETUP PODCAST EVERY SATURDAY', cz: 'PODCAST 4SETUP KAŽDOU SOBOTU' },
  'podcast.cta': { en: 'NEW EPISODE', cz: 'NOVÁ EPIZODA' },

  'ourSetups.title': { en: 'Our SETUPS', cz: 'Naše SETUPY' },
  'ourSetups.gaming': { en: 'Gaming room', cz: 'Gaming room' },
  'ourSetups.office': { en: 'Office', cz: 'Kancelář' },
  'ourSetups.podcast': { en: 'Podcast rooms + Streaming studios', cz: 'Podcastovny + Streamovací studia' },

  'newsletter.title': { en: 'WANT TO STAY INFORMED?', cz: 'CHCEŠ MÍT PŘEHLED?' },
  'newsletter.cta': { en: 'SUBSCRIBE TO NEWSLETTER', cz: 'ODEBÍREJ NEWSLETTER' },
  'newsletter.placeholder': { en: 'Your email address', cz: 'Tvůj email' },

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
    // Update HTML lang attribute to prevent Google Translate from offering translation
    // Use 'cs' (ISO 639-1 code) for Czech instead of 'cz'
    const langCode = lang === 'cz' ? 'cs' : 'en'
    document.documentElement.lang = langCode
    
    // Update content-language meta tag
    let metaLang = document.querySelector('meta[http-equiv="content-language"]')
    if (metaLang) {
      metaLang.setAttribute('content', langCode)
    } else {
      metaLang = document.createElement('meta')
      metaLang.setAttribute('http-equiv', 'content-language')
      metaLang.setAttribute('content', langCode)
      document.head.appendChild(metaLang)
    }
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


