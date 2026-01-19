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

  // New Landing Page
  'landing.hero.line1': { en: 'YOUR SPACE', cz: 'VÁŠ PROSTOR' },
  'landing.hero.line2': { en: 'ELEVATED', cz: 'NA NOVÉ ÚROVNI' },
  'landing.hero.tagline': { 
    en: 'Premium gaming setups, custom spaces, and high-end products designed for those who demand excellence.', 
    cz: 'Prémiové herní sestavy, prostory na míru a produkty nejvyšší kvality pro ty, kdo vyžadují dokonalost.' 
  },
  'landing.hero.ctaPrimary': { en: 'GET YOUR SETUP', cz: 'ZÍSKEJ SVŮJ SETUP' },
  'landing.hero.ctaSecondary': { en: 'VIEW PRODUCTS', cz: 'PROHLÉDNOUT PRODUKTY' },
  'landing.hero.scroll': { en: 'Scroll to explore', cz: 'Scrolluj a objevuj' },

  'landing.services.label': { en: 'What We Do', cz: 'Co děláme' },
  'landing.services.title': { en: 'SERVICES', cz: 'SLUŽBY' },

  'landing.services.spaces.title': { en: 'CUSTOM SPACES', cz: 'PROSTORY NA MÍRU' },
  'landing.services.spaces.desc': { 
    en: 'Your vision. Our realization.', 
    cz: 'Vaše vize. Naše realizace.' 
  },
  'landing.services.spaces.tag1': { en: 'Gaming Rooms', cz: 'Herní pokoje' },
  'landing.services.spaces.tag2': { en: 'Streaming Studios', cz: 'Streamovací studia' },
  'landing.services.spaces.tag3': { en: 'Offices', cz: 'Kanceláře' },
  'landing.services.spaces.cta': { en: 'I WANT MY SETUP', cz: 'CHCI SVŮJ SETUP' },

  'landing.services.products.title': { en: 'PREMIUM PRODUCTS', cz: 'PRÉMIOVÉ PRODUKTY' },
  'landing.services.products.desc': { 
    en: 'Our products designed for the ultimate gaming experience.', 
    cz: 'Naše produkty navržené pro ultimátní herní zážitek.' 
  },
  'landing.services.products.tag1': { en: 'Desks', cz: 'Stoly' },
  'landing.services.products.tag2': { en: 'Chairs', cz: 'Křesla' },
  'landing.services.products.tag3': { en: 'Lighting', cz: 'Osvětlení' },
  'landing.services.products.cta': { en: 'EXPLORE COLLECTION', cz: 'PROZKOUMAT KOLEKCI' },

  'landing.features.label': { en: 'Why Choose Us', cz: 'Proč si vybrat nás' },
  'landing.features.title': { en: 'THE 4SETUP DIFFERENCE', cz: 'ROZDÍL 4SETUP' },
  'landing.features.f1.title': { en: 'Premium Quality', cz: 'Prémiová kvalita' },
  'landing.features.f1.desc': { en: 'Every product and project meets the highest standards of craftsmanship.', cz: 'Každý produkt a projekt splňuje nejvyšší standardy řemeslné práce.' },
  'landing.features.f2.title': { en: 'Custom Design', cz: 'Design na míru' },
  'landing.features.f2.desc': { en: 'Tailored solutions that perfectly match your vision and needs.', cz: 'Řešení na míru, která dokonale odpovídají vaší vizi a potřebám.' },
  'landing.features.f3.title': { en: 'Full Service', cz: 'Kompletní servis' },
  'landing.features.f3.desc': { en: 'From concept to installation, we handle every detail for you.', cz: 'Od konceptu po instalaci, postaráme se o každý detail za vás.' },
  'landing.features.f4.title': { en: 'Expert Support', cz: 'Expertní podpora' },
  'landing.features.f4.desc': { en: 'Dedicated team ready to help you create your perfect space.', cz: 'Specializovaný tým připravený pomoci vám vytvořit perfektní prostor.' },

  'landing.cta.title': { en: 'READY TO UPGRADE?', cz: 'PŘIPRAVENI NA UPGRADE?' },
  'landing.cta.desc': { en: 'Let\'s discuss your dream setup and make it a reality.', cz: 'Pojďme probrat váš vysněný setup a proměnit ho v realitu.' },
  'landing.cta.button': { en: 'GET IN TOUCH', cz: 'KONTAKTUJTE NÁS' },

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
  
  'products.block1.title': { en: 'Looking for standard lighting?', cz: 'Hledáte standardní osvětlení?' },
  'products.block1.desc': { en: 'Visit our e-shop for ready-to-buy products.', cz: 'Navštivte náš e-shop.' },
  'products.block1.cta': { en: 'VISIT E-SHOP', cz: 'NAVŠTÍVIT E-SHOP' },
  'products.block1.text': { en: 'Every detail\nmatters', cz: 'Každý detail\nse počítá' },
  'products.block2.text': { en: 'Built to\ninspire', cz: 'Vytvořeno pro\ninspiraci' },
  'products.block3.text': { en: 'Form meets\nfunction', cz: 'Forma splývá\ns funkcí' },
  'products.block4.text': { en: 'Engineered for champions', cz: 'Vytvořeno pro šampióny' },

  // Spaces Page
  'spaces.hero.subtitle': { en: 'gaming, streaming, work, learning', cz: 'gaming, streaming, práce, učení' },
  
  'spaces.process.title': { en: 'HOW IT WORKS', cz: 'JAK TO PROBÍHÁ' },
  'spaces.process.subtitle': { en: 'From idea to realization in 3 simple steps', cz: 'Od nápadu k realizaci ve 3 jednoduchých krocích' },
  'spaces.process.showDetails': { en: 'Show details', cz: 'Zobrazit detaily' },
  'spaces.process.hideDetails': { en: 'Hide details', cz: 'Skrýt detaily' },
  
  'spaces.process.step1.title': { en: 'CONSULTATION', cz: 'KONZULTACE' },
  'spaces.process.step1.desc': { 
    en: 'We start with a detailed questionnaire to understand your needs, preferences, and vision. We discuss your space, budget, and goals to create a personalized plan.',
    cz: 'Začínáme detailním dotazníkem, abychom pochopili vaše potřeby, preference a vizi. Probereme váš prostor, rozpočet a cíle pro vytvoření personalizovaného plánu.'
  },
  
  'spaces.process.step2.title': { en: '3D DESIGN', cz: '3D NÁVRH' },
  'spaces.process.step2.desc': { 
    en: 'Our designers create a stunning 3D visualization of your future space. You can see exactly how everything will look before we start the realization.',
    cz: 'Naši designéři vytvoří úchvatnou 3D vizualizaci vašeho budoucího prostoru. Můžete přesně vidět, jak bude vše vypadat, než začneme s realizací.'
  },
  
  'spaces.process.step3.title': { en: 'REALIZATION', cz: 'REALIZACE' },
  'spaces.process.step3.desc': { 
    en: 'We handle everything from product delivery to final installation. Our team ensures every detail is perfect and your space is ready to use.',
    cz: 'Postaráme se o vše od dodání produktů po finální instalaci. Náš tým zajistí, že každý detail je dokonalý a váš prostor je připraven k použití.'
  },

  'spaces.gallery.view': { en: 'VIEW GALLERY', cz: 'PROHLÉDNOUT' },

  'spaces.form.title': { en: 'GET YOUR CUSTOM SETUP', cz: 'ZÍSKEJTE SVŮJ SETUP NA MÍRU' },
  'spaces.form.subtitle': { en: 'Fill out the form and we\'ll contact you within 24 hours', cz: 'Vyplňte formulář a ozveme se vám do 24 hodin' },
  
  'spaces.form.purpose': { en: 'What\'s the purpose of your setup?', cz: 'K čemu bude váš setup sloužit?' },
  'spaces.form.purposes.gaming': { en: 'Gaming', cz: 'Gaming' },
  'spaces.form.purposes.work': { en: 'Work', cz: 'Práce' },
  'spaces.form.purposes.streaming': { en: 'Streaming', cz: 'Streaming' },
  'spaces.form.purposes.podcast': { en: 'Podcast', cz: 'Podcast' },
  'spaces.form.purposes.other': { en: 'Other', cz: 'Jiné' },

  'spaces.form.currentState': { en: 'Current state of your space', cz: 'Aktuální stav vašeho prostoru' },
  'spaces.form.states.fromScratch': { en: 'Building from scratch', cz: 'Stavím od nuly' },
  'spaces.form.states.upgrade': { en: 'I want an upgrade', cz: 'Chci upgrade' },

  'spaces.form.budget': { en: 'Budget range', cz: 'Rozpočet' },
  'spaces.form.budgets.under50k': { en: 'Under 50,000 CZK', cz: 'Do 50 000 Kč' },
  'spaces.form.budgets.50to100k': { en: '50,000 - 100,000 CZK', cz: '50 000 - 100 000 Kč' },
  'spaces.form.budgets.100to200k': { en: '100,000 - 200,000 CZK', cz: '100 000 - 200 000 Kč' },
  'spaces.form.budgets.over200k': { en: 'Over 200,000 CZK', cz: 'Nad 200 000 Kč' },

  'spaces.form.problems': { en: 'What bothers you the most?', cz: 'Co vás nejvíc trápí?' },
  'spaces.form.problemOptions.cables': { en: 'Cables', cz: 'Kabely' },
  'spaces.form.problemOptions.lighting': { en: 'Lighting', cz: 'Světlo' },
  'spaces.form.problemOptions.storage': { en: 'Storage space', cz: 'Odkládací prostor' },
  'spaces.form.problemOptions.design': { en: 'Design', cz: 'Design' },
  'spaces.form.problemOptions.performance': { en: 'Performance', cz: 'Výkon' },
  'spaces.form.problemOptions.space': { en: 'Lack of space', cz: 'Nedostatek místa' },

  'spaces.form.message': { en: 'Additional information (optional)', cz: 'Doplňující informace (volitelné)' },
  'spaces.form.messagePlaceholder': { en: 'Tell us more about your dream setup...', cz: 'Řekněte nám více o vašem vysněném setupu...' },

  'spaces.form.photoLabel': { en: 'Photo of your current space', cz: 'Fotka vašeho aktuálního prostoru' },
  'spaces.form.photoNote': { en: 'You can send photos to info@4setup.cz after submitting this form.', cz: 'Fotky můžete poslat na info@4setup.cz po odeslání tohoto formuláře.' },

  'spaces.form.phone': { en: 'Phone number (optional)', cz: 'Telefonní číslo (volitelné)' },
  'spaces.form.preferredContact': { en: 'Preferred contact method', cz: 'Preferovaný způsob kontaktu' },
  'spaces.form.phoneOption': { en: 'Phone', cz: 'Telefon' },

  'spaces.form.submit': { en: 'SEND REQUEST', cz: 'ODESLAT POPTÁVKU' },
  'spaces.form.responseNote': { en: 'We\'ll get back to you within 24 hours to discuss options.', cz: 'Ozveme se vám do 24 hodin a probereme možnosti.' },
  'spaces.form.success': { en: 'Thank you! We\'ll contact you within 24 hours.', cz: 'Děkujeme! Ozveme se vám do 24 hodin.' },
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


