import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'

export type Lang = 'en' | 'cz'

type Dictionary = Record<string, Record<Lang, string>>

const DICT: Dictionary = {
  'nav.products': { en: 'Products', cz: 'Produkty' },
  'nav.spaces': { en: 'Setups', cz: 'Setupy' },
  'nav.blog': { en: 'Blog', cz: 'Blog' },
  'nav.eshop': { en: 'E-shop', cz: 'E-shop' },
  'nav.contact': { en: 'Contact us', cz: 'Kontaktuj nás' },
  'nav.business': { en: 'BUSINESS', cz: 'BUSINESS' },
  'nav.businessLabel': { en: 'Are you a company?', cz: 'Jste firma?' },

  'hero.title': { en: 'WE CREATE CUSTOM SPACES!', cz: 'TVOŘÍME PROSTORY NA MÍRU!' },
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

  'ourSetups.title': { en: 'Our SETUPS', cz: 'Naše SETUPY' },
  'ourSetups.subtitle': { en: 'Explore our latest realizations', cz: 'Prohlédněte si naše nejnovější realizace' },
  'ourSetups.gaming': { en: 'Gaming Rooms', cz: 'Herní místnosti' },
  'ourSetups.office': { en: 'Home Offices', cz: 'Domácí kanceláře' },
  'ourSetups.streaming': { en: 'Streaming Studios', cz: 'Streamovací studia' },

  'newsletter.title': { en: 'WANT TO STAY INFORMED?', cz: 'CHCEŠ MÍT PŘEHLED?' },
  'newsletter.cta': { en: 'SUBSCRIBE TO NEWSLETTER', cz: 'ODEBÍREJ NEWSLETTER' },
  'newsletter.placeholder': { en: 'Your email address', cz: 'Tvůj email' },

  'page.blog.title': { en: 'Blog', cz: 'Blog' },
  'page.blog.desc': { en: 'Guides and inspiration for performance setups and immersive spaces.', cz: 'Návody a inspirace pro výkonné sestavy a pohlcující prostředí.' },
  'blog.backToList': { en: 'Back to articles', cz: 'Zpět na články' },
  'blog.ctaTitle': { en: 'Ready to build your perfect setup?', cz: 'Připraveni na váš dokonalý setup?' },
  'page.contact.title': { en: 'Contact', cz: 'Kontakt' },
  'page.contact.contactUs': { en: 'Contact us:', cz: 'Kontaktujte nás:' },
  'page.contact.phone': { en: 'Phone:', cz: 'Telefon:' },
  'page.contact.email': { en: 'Email:', cz: 'Email:' },
  'page.contact.companyInfo': { en: 'Company Information', cz: 'Informace o společnosti' },
  'contact.formTitle': { en: 'Send us a message', cz: 'Napište nám' },
  'contact.name': { en: 'Your name', cz: 'Vaše jméno' },
  'contact.emailPlaceholder': { en: 'Your email', cz: 'Váš email' },
  'contact.subject': { en: 'Subject', cz: 'Předmět' },
  'contact.message': { en: 'Your message', cz: 'Vaše zpráva' },
  'contact.send': { en: 'SEND MESSAGE', cz: 'ODESLAT ZPRÁVU' },
  'contact.sending': { en: 'SENDING...', cz: 'ODESÍLÁM...' },
  'contact.success': { en: 'Message sent successfully! We\'ll get back to you soon.', cz: 'Zpráva byla úspěšně odeslána! Brzy se vám ozveme.' },
  'contact.error': { en: 'Something went wrong. Please try again or email us directly.', cz: 'Něco se pokazilo. Zkuste to znovu nebo nám napište přímo.' },

  'landing.products': { en: 'PRODUCTS', cz: 'PRODUKTY' },
  'landing.customSpaces': { en: 'CUSTOM SPACES', cz: 'PROSTORY NA MÍRU' },

  'products.hero.title': { en: 'PREMIUM COLLECTION', cz: 'PRÉMIOVÁ KOLEKCE' },
  'products.hero.subtitle': { en: 'Crafted for perfection. Designed for champions.', cz: 'Vytvořeno pro dokonalost. Navrženo pro šampióny.' },
  'products.viewDetails': { en: 'VIEW DETAILS', cz: 'ZOBRAZIT DETAIL' },
  'products.footer.warranty': { en: 'All products come with lifetime warranty and premium support.', cz: 'Všechny produkty zahrnují doživotní záruku a prémiovou podporu.' },
  'products.footer.customOrder': { en: 'CUSTOM ORDER', cz: 'OBJEDNÁVKA NA MÍRU' },
  
  'products.apexDesk.name': { en: 'APEX PRO DESK', cz: 'APEX PRO DESK' },
  'products.apexDesk.category': { en: 'Premium Gaming Desk', cz: 'Prémiový herní stůl' },
  'products.apexDesk.description': { en: 'Handcrafted carbon fiber surface with integrated RGB lighting system and wireless charging zones.', cz: 'Ručně vyrobený karbon povrch s integrovaným RGB osvětlením a bezdrátovými nabíjecími zónami.' },
  
  'products.phantomChair.name': { en: 'PHANTOM CHAIR', cz: 'PHANTOM KŘESLO' },
  'products.phantomChair.category': { en: 'Ergonomic Gaming Chair', cz: 'Ergonomické herní křeslo' },
  'products.phantomChair.description': { en: 'Premium leather with memory foam, magnetic lumbar support, and adjustable 4D armrests.', cz: 'Prémiová kůže s memory pěnou, magnetická bederní podpora a nastavitelné 4D opěrky.' },
  
  'products.nexusLight.name': { en: 'NEXUS LIGHT PANEL', cz: 'NEXUS SVĚTELNÝ PANEL' },
  'products.nexusLight.category': { en: 'Ambient Lighting System', cz: 'Ambientní osvětlení' },
  'products.nexusLight.description': { en: 'Modular hexagonal panels with 16.8M colors, music sync, and AI-powered ambient modes.', cz: 'Modulární hexagonální panely s 16,8M barvami, synchronizací hudby a AI ambientními režimy.' },
  
  'products.titanWorkstation.name': { en: 'TITAN WORKSTATION', cz: 'TITAN WORKSTATION' },
  'products.titanWorkstation.category': { en: 'Ultimate Gaming PC', cz: 'Ultimátní herní PC' },
  'products.titanWorkstation.description': { en: 'Custom liquid-cooled build with RTX 4090, i9-14900K, and tempered glass showcase design.', cz: 'Vlastní vodně chlazená sestava s RTX 4090, i9-14900K a prémiovým skleněným designem.' },
  
  'products.block1.text': { en: 'Every detail\nmatters', cz: 'Každý detail\nse počítá' },
  'products.block2.text': { en: 'Built to\ninspire', cz: 'Vytvořeno pro\ninspiraci' },
  'products.block3.text': { en: 'Form meets\nfunction', cz: 'Forma splývá\ns funkcí' },
  'products.block4.text': { en: 'Engineered for champions', cz: 'Vytvořeno pro šampióny' },
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


