import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'

export type Lang = 'en' | 'cz'

type Dictionary = Record<string, Record<Lang, string>>

const DICT: Dictionary = {
  'nav.products': { en: 'Products', cz: 'Produkty' },
  'nav.spaces': { en: 'Setups', cz: 'Setupy' },
  'nav.blog': { en: 'Blog', cz: 'Blog' },
  'nav.eshop': { en: 'E-shop', cz: 'E-shop' },
  'nav.contact': { en: 'Contact us', cz: 'Kontaktuj nás' },

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
  'landing.features.title': { en: 'WHY CHOOSE 4SETUP', cz: 'PROČ SI VYBRAT 4SETUP' },
  'landing.features.f1.title': { en: 'Comprehensive Approach', cz: 'Komplexní pojetí' },
  'landing.features.f1.desc': { 
    en: 'Whether you\'re gaming, programming, or studying at your desk, we design spaces with a functional environment that supports focus and long-term comfort.',
    cz: 'Ať už u stolu hrajete, programujete nebo se učíte, navrhneme pro vás prostory s funkčním prostředím, které podporuje soustředění a dlouhodobé pohodlí u stolu.'
  },
  'landing.features.f2.title': { en: 'Technical Discipline', cz: 'Technická disciplína' },
  'landing.features.f2.desc': { 
    en: 'Cable management for us isn\'t just hiding cables – it\'s a systematic arrangement of all technology. The result is a clean, safe, and easily maintainable space that won\'t distract you from work or play.',
    cz: 'Cable management pro nás není jen schování kabelů, ale systémové uspořádání veškeré techniky. Výsledkem je čistý, bezpečný a snadno udržitelný prostor, který vás nebude rozptylovat od práce ani hry.'
  },
  'landing.features.f3.title': { en: 'Purposeful Lighting', cz: 'Světlo, které má smysl' },
  'landing.features.f3.desc': { 
    en: 'We design lighting scenes that protect your eyes, look great on camera, and create the ideal atmosphere for both focus and relaxation.',
    cz: 'Navrhujeme světelné scény, které šetří váš zrak, vypadají skvěle na kameře a tvoří ideální atmosféru pro soustředění i relaxaci.'
  },
  'landing.features.f4.title': { en: 'Our Own Products', cz: 'Vlastní produkty' },
  'landing.features.f4.desc': { 
    en: 'We manufacture a select collection of exclusive accessories you won\'t find anywhere else. Each piece is designed, tested, and made by us. Get them as a standalone upgrade for your current setup, or we\'ll use them as exclusive design elements in your new space.',
    cz: 'Vyrábíme úzkou kolekci exkluzivních doplňků, které jinde nenajdete. Každý kus jsme sami navrhli, otestovali a vyrobili. Můžete si je pořídit jako samostatný upgrade svého stávajícího setupu, nebo je využijeme jako exkluzivní designové prvky při návrhu vašeho nového prostoru.'
  },

  'landing.cta.title': { en: 'READY TO UPGRADE?', cz: 'PŘIPRAVENI NA UPGRADE?' },
  'landing.cta.desc': { en: 'Let\'s discuss your dream setup and make it a reality.', cz: 'Pojďme probrat váš vysněný setup a proměnit ho v realitu.' },
  'landing.cta.button': { en: 'GET IN TOUCH', cz: 'KONTAKTUJTE NÁS' },

  'products.hero.title': { en: 'PREMIUM COLLECTION', cz: 'PRÉMIOVÁ KOLEKCE' },
  'products.hero.subtitle': { en: 'Crafted for perfection. Designed for champions.', cz: 'Vytvořeno pro dokonalost. Navrženo pro šampióny.' },
  'products.viewDetails': { en: 'VIEW DETAILS', cz: 'ZOBRAZIT DETAIL' },
  'products.footer.warranty': { en: 'All products come with lifetime warranty and premium support.', cz: 'Všechny produkty zahrnují doživotní záruku a prémiovou podporu.' },
  'products.footer.customOrder': { en: 'CONTACT US', cz: 'KONTAKTUJTE NÁS' },
  
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
  
  'products.backToProducts': { en: '← Back to Products', cz: '← Zpět na produkty' },
  
  'products.newsletter.title': { en: 'Want to be among the first?', cz: 'Chcete být mezi prvními?' },
  'products.newsletter.desc': { en: 'Leave us your email and get priority information about the launch.', cz: 'Zanechte nám svůj e-mail a získáte přednostní informace o spuštění prodeje.' },
  'products.newsletter.cta': { en: 'NOTIFY ME', cz: 'CHCI VĚDĚT' },
  'products.newsletter.success': { en: 'Thank you! We\'ll keep you posted.', cz: 'Děkujeme! Budeme vás informovat.' },

  // Stone Light Product
  'products.stoneLight.name': { en: 'STONE LIGHT', cz: 'KAMENNÉ SVĚTLO' },
  'products.stoneLight.tagline': { en: 'Premium design light made from real stone', cz: 'Prémiové designové světlo z pravého kamene' },
  'products.stoneLight.introText': { 
    en: 'Introducing Stone Light — a unique Czech design product that combines real stone with modern lighting technology. Unlike custom installations that are typically very expensive and permanently built into walls, we bring a solution you can simply buy as a finished product. Unbox, install, and illuminate.',
    cz: 'Představujeme kamenné svítidlo — unikátní český designový produkt, který spojuje skutečný kámen s moderní světelnou technologií. Na rozdíl od zakázkových realizací, které jsou běžně velmi nákladné a pevně zabudované ve stěně, přinášíme řešení, které si jednoduše koupíte jako hotový produkt. Rozbalíte, nainstalujete a svítíte.'
  },
  'products.stoneLight.ambient.title': { en: 'Atmospheric Light for Modern Interiors', cz: 'Atmosférické světlo pro moderní interiér' },
  'products.stoneLight.ambient.text': { 
    en: 'Stone Light is designed primarily as ambient and supplementary lighting. It creates a pleasant, luxurious atmosphere without harsh overhead lighting. When using multiple panels, you can create fully layered room lighting without the need for a dominant ceiling fixture.',
    cz: 'Kamenné svítidlo je navržené především jako ambientní a doplňkové osvětlení. V prostoru vytváří příjemnou, luxusní atmosféru bez ostrého stropního světla. Při použití více panelů můžete vytvořit plnohodnotné vrstvené osvětlení prostoru bez potřeby dominantního stropního svítidla.'
  },
  'products.stoneLight.ambient.list': { 
    en: 'Design interiors|Relaxation zones and wellness|Modern living rooms|Offices and commercial spaces|Bars and receptions',
    cz: 'Designové interiéry|Relaxační zóny a wellness|Moderní obývací pokoje|Kanceláře a komerční prostory|Bary a recepce'
  },
  'products.stoneLight.design.title': { en: 'Real Stone, Pure Design', cz: 'Pravý kámen, čistý design' },
  'products.stoneLight.design.text': { 
    en: 'Each light is made from real stone that naturally highlights its undertones when backlit. The design is crafted to perfectly fit modern interiors and meet the requirements of architects and designers.',
    cz: 'Každé svítidlo je vyrobeno z reálného kamene, který přirozeně zvýrazňuje své podtóny při podsvícení. Design je navržený tak, aby perfektně zapadl do moderních interiérů a splňoval požadavky architektů i designérů.'
  },
  'products.stoneLight.design.list': { 
    en: 'Neutral white backlighting|Color backlighting to enhance stone structure',
    cz: 'Neutrální bílé podsvícení|Barevné podsvícení pro zvýraznění struktury kamene'
  },
  'products.stoneLight.construction.title': { en: 'Ultra-thin Construction', cz: 'Ultratenká konstrukce' },
  'products.stoneLight.construction.text': { 
    en: 'Standard stone backlighting requires deep wall installation for electronics and cooling. We went a different way. The result is an extraordinarily thin design light that looks minimalist and luxurious.',
    cz: 'Běžná kamenná podsvícení vyžadují hluboké zabudování do stěny kvůli elektronice a chlazení. My jsme šli jinou cestou. Výsledkem je mimořádně tenké designové svítidlo, které působí minimalisticky a luxusně.'
  },
  'products.stoneLight.construction.list': { 
    en: 'Panel thickness approximately 2 cm|Separate external power source (can be hidden in wall or furniture)|Clean front surface without distracting frame|Premium materials and craftsmanship',
    cz: 'Tloušťka panelu přibližně 2 cm|Samostatný externí zdroj (lze skrýt do stěny nebo nábytku)|Čistá čelní plocha bez rušivého rámečku|Prémiové materiály a zpracování'
  },
  'products.stoneLight.modular.title': { en: 'Modular and Custom Options', cz: 'Modulární a zakázkové možnosti' },
  'products.stoneLight.modular.text': { 
    en: 'The basic intended format is 60 × 120 cm, but the system allows for multiple panels side by side, continuous stone patterns (custom), and future expansion to additional formats. We\'re also planning a design light cube (e.g., coffee table 60 × 60 cm) for the future.',
    cz: 'Základní zamýšlený formát je 60 × 120 cm, ale systém umožňuje instalaci více panelů vedle sebe, navazující kresbu kamene (na míru) a budoucí rozšíření o další formáty. Do budoucna plánujeme také designovou světelnou kostku (např. konferenční stolek 60 × 60 cm).'
  },
  'products.stoneLight.czech.title': { en: 'Czech Development and Manufacturing', cz: 'Český vývoj a výroba' },
  'products.stoneLight.czech.text': { 
    en: 'We develop the product completely in-house — from construction to final appearance. The goal is to create a premium design light that will be available as a finished product, not just as an expensive custom installation.',
    cz: 'Produkt kompletně vyvíjíme interně — od konstrukce až po finální vzhled. Cílem je vytvořit prémiové designové svítidlo, které bude dostupné jako hotový produkt, nikoli pouze jako drahá zakázková instalace.'
  },

  // Matrix Product
  'products.matrix.name': { en: 'MATRIX', cz: 'MATRIX' },
  'products.matrix.tagline': { en: 'Modular large-scale LED light for gaming and modern interiors', cz: 'Modulární velkoplošné LED světlo pro gaming i moderní interiér' },
  'products.matrix.introText': { 
    en: 'Forget ordinary LED strips. Matrix is a modular large-scale LED light that you assemble precisely according to your wall — and display anything from retro animations to ambient lighting effects. Create your own light wall for a gaming room, studio, or modern interior.',
    cz: 'Zapomeňte na obyčejné LED pásky. Matrix je modulární velkoplošné LED světlo, které si sestavíte přesně podle své stěny — a zobrazíte na něm cokoliv od retro animací až po ambientní světelné efekty. Vytvořte si vlastní světelnou stěnu pro gaming room, studio nebo moderní interiér.'
  },
  'products.matrix.pixel.title': { en: 'Pixel Classic', cz: 'Pixelová klasika' },
  'products.matrix.pixel.text': { 
    en: 'Want Pac-Man running behind you or sharp gaming animations? Turn on pixel mode and enjoy the true retro gaming vibe with perfectly readable pixels.',
    cz: 'Chcete, aby vám za zády běžel Pac-Man nebo ostré herní animace? Zapněte pixelový režim a užijte si pravý retro gaming vibe s perfektně čitelnými pixely.'
  },
  'products.matrix.pixel.list': { 
    en: 'Gaming rooms|Streaming backgrounds|Gaming studios|Retro enthusiasts',
    cz: 'Gaming rooms|Streamovací pozadí|Herní studia|Retro nadšence'
  },
  'products.matrix.diffuse.title': { en: 'Diffuse Mode', cz: 'Difuzní režim' },
  'products.matrix.diffuse.text': { 
    en: 'In this mode, colors and shapes organically blend into space, creating a smooth lighting atmosphere. Perfect as ambient backlighting, a design interior element, or a light backdrop without distracting details.',
    cz: 'Barvy a tvary se v tomto režimu organicky rozpíjejí do prostoru a vytvářejí plynulou světelnou atmosféru. Perfektní jako ambientní podsvícení, designový prvek interiéru nebo světelná kulisa bez rušivých detailů.'
  },
  'products.matrix.development.title': { en: 'Developed and Made In-House', cz: 'Vyvíjeno a vyráběno u nás v dílně' },
  'products.matrix.development.text': { 
    en: 'We\'ve been designing and building Matrix from the start in-house. Originally we worked with 8×8 3D LED boards. We\'re currently transitioning to more modern 32×32 modules that significantly simplify installation, improve display quality, and bring the entire system closer to the final production version.',
    cz: 'Matrix od začátku navrhujeme a stavíme interně. Původně jsme pracovali s 3D LED destičkami 8×8. Aktuálně přecházíme na modernější moduly 32×32, které výrazně zjednodušují instalaci, zvyšují kvalitu zobrazení a posouvají celý systém blíž k finální produkční verzi.'
  },

  // Speaker Product
  'products.speaker.name': { en: 'SPEAKER', cz: 'REPRODUKTOR' },
  'products.speaker.tagline': { en: 'Design speaker for discerning listeners', cz: 'Designový reproduktor pro náročný poslech' },
  'products.speaker.introText': { 
    en: 'When choosing a speaker today, you usually face a compromise: reasonable price, quality sound, attractive design. Usually you can choose at most two of these things. We believe it can be different.',
    cz: 'Když si dnes vybíráte reproduktor, většinou stojíte před kompromisem: rozumná cena, kvalitní zvuk, atraktivní design. Obvykle si můžete vybrat maximálně dvě z těchto věcí. My věříme, že to jde i jinak.'
  },
  'products.speaker.quality.title': { en: 'Uncompromised Sound for the Everyday Listener', cz: 'Zvuk bez kompromisů pro běžného posluchače' },
  'products.speaker.quality.text': { 
    en: 'We\'re audiophiles. We love clean, detailed sound. At the same time, we love beautiful interiors — and like most people, we don\'t want to spend tens or hundreds of thousands on speakers. Today\'s market often shows two extremes: cheap speakers with average sound, or top audio setups for tens to hundreds of thousands. But there\'s a missing product in between that would combine high sound quality, accessible price, and modern design. That\'s exactly our goal.',
    cz: 'Jsme audiofilové. Milujeme čistý, detailní zvuk. Zároveň máme rádi krásné interiéry — a stejně jako většina lidí nechceme utrácet desítky nebo stovky tisíc za reproduktory. Na trhu dnes často vidíte dvě extrémní polohy: levné reproduktory s průměrným zvukem, nebo špičkové audio sestavy za desítky až stovky tisíc. Mezi nimi ale chybí produkt, který by kombinoval vysokou kvalitu zvuku, dostupnou cenu a moderní design. Právě to je náš cíl.'
  },
  'products.speaker.sweetSpot.title': { en: 'Where Sound Quality Really Breaks', cz: 'Kde se skutečně láme kvalita zvuku' },
  'products.speaker.sweetSpot.text': { 
    en: 'In the audio world, there are clear performance levels. The biggest jump in quality comes when transitioning from regular consumer electronics to proper Hi-Fi speakers. Further improvements come gradually and often at significantly higher prices. For most discerning listeners, there\'s a point where sound is already excellent for everyday listening — without the need to invest extreme amounts in ultra high-end solutions. That\'s the point we\'re targeting.',
    cz: 'Ve světě audia existují jasné výkonnostní úrovně. Největší skok v kvalitě přichází při přechodu z běžné spotřební elektroniky do poctivých Hi-Fi reproduktorů. Další zlepšení už přichází postupně a často za výrazně vyšší cenu. Pro většinu náročných posluchačů existuje bod, kde už je zvuk výborný pro každodenní poslech — bez nutnosti investovat extrémní částky do ultra high-end řešení. Na tento bod cílíme.'
  },
  'products.speaker.design.title': { en: 'Design That Belongs in Modern Interiors', cz: 'Design, který patří do moderního interiéru' },
  'products.speaker.design.text': { 
    en: 'With top-tier audio, sound is often the focus, but design comes second. We approach it differently. Our speaker is designed to play great, look good in modern interiors, and not be priced out of reach for regular users. Because quality sound shouldn\'t be reserved only for extremely expensive setups.',
    cz: 'U špičkového audia se často řeší zvuk, ale design přichází až na druhém místě. My to stavíme jinak. Náš reproduktor je navržen tak, aby skvěle hrál, dobře vypadal v moderním interiéru a nebyl cenově mimo realitu běžného uživatele. Protože kvalitní zvuk by neměl být vyhrazený jen pro extrémně drahé sestavy.'
  },
  'products.speaker.target.title': { en: 'Who We\'re Developing the Speaker For', cz: 'Pro koho reproduktor vyvíjíme' },
  'products.speaker.target.text': { 
    en: 'For listeners who want significantly better sound than regular Bluetooth speakers, care about the look of their space, don\'t want to spend unreasonable amounts on high-end audio, and want an honest performance/price ratio.',
    cz: 'Pro posluchače, kteří chtějí výrazně lepší zvuk než z běžných Bluetooth reproduktorů, řeší vzhled svého prostoru, nechtějí utrácet nesmyslné částky za high-end audio a chtějí poctivý poměr výkon / cena.'
  },
  'products.speaker.development.title': { en: 'Development Happening In-House', cz: 'Vývoj probíhá interně' },
  'products.speaker.development.text': { 
    en: 'We\'re currently developing the speaker with emphasis on sound clarity and detail, balanced frequency response, modern minimalist design, and accessibility for a wider range of users.',
    cz: 'Reproduktor aktuálně vyvíjíme s důrazem na čistotu a detail zvuku, vyvážený frekvenční projev, moderní minimalistický design a dostupnost pro širší okruh uživatelů.'
  },

  // Spaces Page
  'spaces.hero.subtitle': { en: 'gaming, streaming, work, learning', cz: 'gaming, streaming, práce, učení' },
  
  'spaces.process.title': { en: 'REALIZATION', cz: 'REALIZACE' },
  'spaces.process.subtitle': { en: 'From idea to realization in 3 simple steps', cz: 'Od nápadu k realizaci ve 3 jednoduchých krocích' },
  'spaces.process.showDetails': { en: 'Show details', cz: 'Zobrazit detaily' },
  'spaces.process.hideDetails': { en: 'Hide details', cz: 'Skrýt detaily' },
  
  'spaces.process.step1.title': { en: 'CONSULTATION', cz: 'KONZULTACE' },
  'spaces.process.step1.subtitle': { en: '"It all starts with your vision."', cz: '„Vše začíná u vaší vize."' },
  'spaces.process.step1.desc': { 
    en: 'Together we discuss your ideas, technical requirements, and aesthetic preferences. We don\'t just solve desks and chairs - we handle complete equipment, lighting, construction work, and overall ergonomics and acoustics. → You\'ll get a clear plan and initial ideas on how to maximize your space\'s potential.',
    cz: 'Společně probereme vaše představy, nároky na techniku i estetické preference. Neřešíme jen stůl a židli, ale kompletní vybavení, osvětlení, stavební práce a celkovou ergonomii a akustiku. → Získáte jasný plán a první nápady, jak využít potenciál vašeho prostoru na maximum.'
  },
  
  'spaces.process.step2.title': { en: '3D DESIGN', cz: '3D NÁVRH' },
  'spaces.process.step2.subtitle': { en: '"See the future before we begin."', cz: '„Uvidíte budoucnost dřív, než začneme."' },
  'spaces.process.step2.desc': { 
    en: 'Based on the consultation, we create a 3D visualization of your new corner and define an estimated budget. You\'ll see exact furniture placement, color scheme, and our proposed lighting and cable management system. → You\'ll get a realistic view of the final result. At this stage, we fine-tune details, materials, and accessories so everything fits perfectly.',
    cz: 'Na základě konzultace vytvoříme 3D vizualizaci vašeho nového koutku a definujeme odhadovaný rozpočet. Uvidíte přesné rozmístění nábytku, barevné schéma i náš navržený systém osvětlení a cable managementu. → Získáte realistický pohled na finální výsledek. V této fázi ladíme detaily, materiály a doplňky tak, aby vše lícovalo na milimetr přesně.'
  },
  
  'spaces.process.step3.title': { en: 'REALIZATION', cz: 'REALIZACE' },
  'spaces.process.step3.subtitle': { en: '"From idea to first power-on – worry-free."', cz: '„Od nápadu k prvnímu zapnutí – bez starostí."' },
  'spaces.process.step3.desc': { 
    en: 'Once you approve the design, we take the reins. We handle component delivery, professional furniture assembly, and precise tech installation. Our specialty is invisible cable routing and lighting calibration for the best atmosphere. → You\'ll get a finished, fully functional, and modern setup ready for immediate use. No stress with manuals, no chaos under the desk.',
    cz: 'Jakmile schválíte návrh, přebíráme otěže my. Zajistíme dodání komponentů, odbornou montáž nábytku a precizní instalaci techniky. Naší specialitou je neviditelné vedení kabelů a kalibrace osvětlení pro tu nejlepší atmosféru. → Získáte hotový, plně funkční a moderní setup připravený k okamžitému použití. Žádný stres s manuály, žádný chaos pod stolem.'
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
  'spaces.form.budgets.under500k': { en: 'Under 500,000 CZK', cz: 'Do 500 tis. Kč' },
  'spaces.form.budgets.500kTo1m': { en: '500,000 - 1,000,000 CZK', cz: '500 tis. - 1 mil. Kč' },
  'spaces.form.budgets.over1m': { en: 'Over 1,000,000 CZK', cz: '1 mil. Kč +' },

  'spaces.form.problems': { en: 'What bothers you the most?', cz: 'Co vás nejvíc trápí?' },
  'spaces.form.problemOptions.cables': { en: 'Cables', cz: 'Kabely' },
  'spaces.form.problemOptions.lighting': { en: 'Lighting', cz: 'Světlo' },
  'spaces.form.problemOptions.storage': { en: 'Storage space', cz: 'Odkládací prostor' },
  'spaces.form.problemOptions.design': { en: 'Design', cz: 'Design' },
  'spaces.form.problemOptions.performance': { en: 'Performance', cz: 'Výkon' },
  'spaces.form.problemOptions.space': { en: 'Lack of space', cz: 'Nedostatek místa' },

  'spaces.form.message': { en: 'Additional information (optional)', cz: 'Doplňující informace (volitelné)' },
  'spaces.form.messagePlaceholder': { en: 'Tell us more about your dream setup...', cz: 'Řekněte nám více o vašem vysněném setupu...' },

  'spaces.form.phone': { en: 'Phone number (optional)', cz: 'Telefonní číslo (volitelné)' },
  'spaces.form.preferredContact': { en: 'Preferred contact method', cz: 'Preferovaný způsob kontaktu' },
  'spaces.form.phoneOption': { en: 'Phone', cz: 'Telefon' },

  'spaces.form.submit': { en: 'SEND REQUEST', cz: 'ODESLAT POPTÁVKU' },
  'spaces.form.responseNote': { en: 'We\'ll get back to you within 24 hours to discuss options.', cz: 'Ozveme se vám do 24 hodin a probereme možnosti.' },
  'spaces.form.success': { en: 'Thank you! We\'ll contact you within 24 hours.', cz: 'Děkujeme! Ozveme se vám do 24 hodin.' },

  // Room Type Pages
  'rooms.backToSpaces': { en: 'Back to Setups', cz: 'Zpět na Setupy' },
  'rooms.gallery.title': { en: 'Our Realizations', cz: 'Naše realizace' },
  'rooms.cta.title': { en: 'Ready to create your dream space?', cz: 'Připraveni vytvořit váš vysněný prostor?' },
  
  'rooms.gaming.subtitle': { en: 'Immersive gaming setups designed for victory', cz: 'Pohlcující herní sestavy navržené pro vítězství' },
  'rooms.office.subtitle': { en: 'Professional home offices for maximum productivity', cz: 'Profesionální domácí kanceláře pro maximální produktivitu' },
  'rooms.streaming.subtitle': { en: 'Streaming studios that make you stand out', cz: 'Streamovací studia, která vás odliší' },

  // 404 Page
  'notFound.title': { en: '404', cz: '404' },
  'notFound.message': { en: 'Page not found', cz: 'Stránka nenalezena' },
  'notFound.backHome': { en: 'Back to Home', cz: 'Zpět domů' },

  // Cookie consent
  'cookies.title': { en: 'Cookie Settings', cz: 'Nastavení cookies' },
  'cookies.message': { en: 'We use cookies to ensure the website functions properly and to analyze traffic. You can customize your preferences below.', cz: 'Používáme cookies pro správné fungování webu a analýzu návštěvnosti. Níže si můžete přizpůsobit své preference.' },
  'cookies.acceptAll': { en: 'Accept All', cz: 'Přijmout vše' },
  'cookies.customize': { en: 'Customize', cz: 'Přizpůsobit' },
  'cookies.customizeTitle': { en: 'Cookie Preferences', cz: 'Předvolby cookies' },
  'cookies.customizeDesc': { en: 'Choose which cookies you want to allow. You can change these settings at any time.', cz: 'Vyberte, které cookies chcete povolit. Tato nastavení můžete kdykoliv změnit.' },
  'cookies.functional': { en: 'Functional', cz: 'Funkční' },
  'cookies.functionalDesc': { en: 'Essential for the website to work properly. Cannot be disabled.', cz: 'Nezbytné pro správné fungování webu. Nelze vypnout.' },
  'cookies.analytics': { en: 'Visit Statistics', cz: 'Statistika návštěvnosti' },
  'cookies.analyticsDesc': { en: 'Help us understand how visitors use our website.', cz: 'Pomáhají nám porozumět, jak návštěvníci používají náš web.' },
  'cookies.marketing': { en: 'Marketing', cz: 'Marketing' },
  'cookies.marketingDesc': { en: 'Used to show you relevant ads and measure their effectiveness.', cz: 'Používají se k zobrazování relevantních reklam a měření jejich účinnosti.' },
  'cookies.allowAll': { en: 'Allow All', cz: 'Povolit vše' },
  'cookies.save': { en: 'Save', cz: 'Uložit' },
  'cookies.back': { en: 'Back', cz: 'Zpět' },
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
