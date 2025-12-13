import type { Lang } from '../i18n'

export type BlogPost = {
  id: string
  slug: string
  title: Record<Lang, string>
  excerpt: Record<Lang, string>
  content: Record<Lang, string>
  date: string
  readTime: Record<Lang, string>
  category: Record<Lang, string>
  image?: string
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'co-je-to-setup',
    title: {
      cz: 'Co je to vlastně „setup" a proč byste ho měli mít i vy?',
      en: 'What exactly is a "setup" and why should you have one too?'
    },
    excerpt: {
      cz: 'Pokud byste hledali definici na internetu, narazíte na složité věty o „promyšleném funkčním a estetickém uspořádání prostoru". Ale co to znamená v praxi?',
      en: 'If you search for a definition online, you\'ll find complex sentences about "thoughtful functional and aesthetic space arrangement". But what does it mean in practice?'
    },
    content: {
      cz: `Pokud byste hledali definici na internetu, narazíte na složité věty o „promyšleném funkčním a estetickém uspořádání prostoru optimalizovaném pro specifický účel". Zní to honosně, že? Ale co to znamená v praxi, když u počítače trávíte 8, 10 nebo i 14 hodin denně?

## Není to jen o věcech, je to o pocitu

Setup není jen prostým součtem jednotlivých předmětů. Jde o celistvost. Je to prostor, který je vyladěný do posledního detailu.

Klíčová myšlenka je jednoduchá: **Když se v tom prostoru cítíš dobře, tak se ti v něm krásně funguje.** Ať už jste gamer, který se chce ponořit do hry, nebo profesionál, který potřebuje „čistou hlavu" pro práci, prostředí hraje zásadní roli. Správné světlo, stabilní stůl, poloha monitoru – to vše tvoří harmonii, která přímo ovlivňuje vaši náladu a schopnost se soustředit.

## Existuje jedna klíčová věc, která tvoří setup?

Možná vás napadne, že stačí koupit nejdražší ergonomickou židli nebo obří monitor a máte vyhráno. Pravdou ale je, že žádná dominantní věc, která by sama o sobě setup definovala, neexistuje. Je to vždy o souhře všech prvků.

Samozřejmě, každý prostor může mít svou dominantu, která udává téma:
- U hráče to může být RGB osvětlení a designová skříň počítače.
- U manažera třeba obrovský širokoúhlý monitor.

Ale i ten nejlepší monitor je k ničemu, pokud ho máte na vratkém stole ve špatné výšce. Klávesnice, myš, repráky, sluchátka – vše musí hrát dohromady.

**To nejdůležitější pravidlo zní: Setup musí být na míru.** Neexistuje univerzální návod. Musí odrážet vaše potřeby. Někdo preferuje absolutní minimalismus, aby ho nic nerušilo, jiný potřebuje (doslova) tři stoly do tvaru U, aby měl kolem sebe dostatek odkládacího prostoru. Pokud to vyhovuje vám, je to ten správný setup.

## Svatá trojice každého pracovního místa

Když se však podíváme na úplný základ, bez čeho se dobré místo neobejde? I když se preference liší, existují tři pilíře, na kterých byste měli stavět:

1. **Stabilní stůl a prostor:** Základna pro všechno ostatní. Pokud se stůl klepe při každém úhozu do klávesnice, žádná práce nebude příjemná.

2. **Ergonomie (Židle a Monitor):** To, na čem sedíte, a to, do čeho se díváte. Tyto prvky rozhodují o tom, zda vás budou bolet záda a oči, nebo zda vydržíte pracovat v pohodlí.

3. **Počítač/Hardware:** Srdce celého systému, které musí výkonem odpovídat tomu, co děláte.`,
      en: `If you search for a definition online, you'll find complex sentences about "thoughtful functional and aesthetic space arrangement optimized for a specific purpose". Sounds fancy, right? But what does it mean in practice when you spend 8, 10, or even 14 hours a day at your computer?

## It's not just about things, it's about feeling

A setup isn't just a simple sum of individual items. It's about completeness. It's a space that's fine-tuned down to the last detail.

The key idea is simple: **When you feel good in that space, you function beautifully in it.** Whether you're a gamer who wants to immerse yourself in the game, or a professional who needs a "clear head" for work, the environment plays a crucial role. The right lighting, a stable desk, monitor position – all of this creates harmony that directly affects your mood and ability to focus.

## Is there one key thing that makes a setup?

You might think that buying the most expensive ergonomic chair or a huge monitor is enough to win. But the truth is, there's no dominant thing that defines a setup by itself. It's always about the interplay of all elements.

Of course, every space can have its dominant feature that sets the theme:
- For a gamer, it might be RGB lighting and a designer PC case.
- For a manager, perhaps a huge ultrawide monitor.

But even the best monitor is useless if you have it on a wobbly desk at the wrong height. Keyboard, mouse, speakers, headphones – everything must work together.

**The most important rule is: A setup must be custom-made.** There's no universal guide. It must reflect your needs. Some prefer absolute minimalism so nothing disturbs them, others need (literally) three desks in a U-shape to have enough storage space around them. If it works for you, it's the right setup.

## The holy trinity of every workspace

But when we look at the absolute basics, what can't a good workspace do without? Even though preferences differ, there are three pillars you should build on:

1. **Stable desk and space:** The foundation for everything else. If the desk shakes with every keystroke, no work will be pleasant.

2. **Ergonomics (Chair and Monitor):** What you sit on and what you look at. These elements determine whether your back and eyes will hurt, or whether you'll be able to work comfortably.

3. **Computer/Hardware:** The heart of the entire system, which must match the performance of what you do.`
    },
    date: '2024-12-10',
    readTime: { cz: '4 min čtení', en: '4 min read' },
    category: { cz: 'Průvodce', en: 'Guide' }
  },
  {
    id: '2',
    slug: 'jak-vybrat-material-desky-stolu',
    title: {
      cz: 'Jak vybrat ten správný materiál pro desku stolu?',
      en: 'How to choose the right material for your desk top?'
    },
    excerpt: {
      cz: 'Lamino, MDF, masiv nebo sklo? Každý materiál má své výhody i úskalí. Podívejte se, který je pro váš setup ten pravý.',
      en: 'Laminate, MDF, solid wood or glass? Each material has its pros and cons. Find out which one is right for your setup.'
    },
    content: {
      cz: `## Lamino a MDF: Králové poměru cena/výkon

Pokud hledáte funkčnost a nechcete za desku utratit výplatu, pravděpodobně skončíte v této kategorii. Často se zde setkáte se dvěma zkratkami: LTD a MDF. Jaký je v nich rozdíl?

- **LTD (Lamino):** Jde o dřevotřískovou desku tvořenou z hrubších třísek, jejíž povrch kryje odolná dekorativní fólie. Je lehčí a cenově nejdostupnější. Je to "pracant", který nevyžaduje téměř žádnou údržbu.

- **MDF:** Tady už se bavíme o dřevovláknité desce. Je výrazně hustší, jemnější a pevnější než lamino. Díky své struktuře umožňuje složitější úpravy, jako je frézování hran, a často se lakuje.

**Verdikt:** Lamino vítězí, pokud chcete bezúdržbový stůl za super cenu. MDF volte, pokud chcete něco odolnějšího s prémiovějším finišem, aniž byste museli sahat po pravém dřevě.

## Masiv: Vůně dřeva a dotek přírody

Deska z masivního dřeva (nejčastěji dub, buk nebo jasan) je volbou pro ty, kteří chtějí největší kvalitu. Masiv je robustní, těžký a na první pohled (i dotek) působí luxusně.

**Klady:** Extrémní životnost. Pokud si desku poškrábete, můžete ji přebrousit a je jako nová. Vzhledově je to strop – každý kus je originál díky kresbě dřeva.

**Zápory:** Masiv je tak trochu jako domácí mazlíček – musíte se o něj starat. Vyžaduje pravidelné olejování nebo voskování. Je také citlivější na tekutiny; rozlitá kola nebo káva může zanechat flek, pokud ji setřete pozdě. A samozřejmě, připravte se na vyšší cenovku.

**Verdikt:** Pro fajnšmekry, kteří chtějí nekompromisní kvalitu a nevadí jim věnovat stolu trochu péče výměnou za prémiový vzhled.

## Sklo: High-tech design s chladnou tváří

Tvrzené bezpečnostní sklo je specifická volba, která dokáže setup vizuálně posunout do budoucnosti. Často ho vídáme u designových „showroom" setupů.

**Klady:** Vypadá to skvěle. Sklo opticky odlehčí místnost, působí vzdušně a moderně. Povrch se velmi snadno umývá.

**Zápory:** Tady narážíme na praktičnost. Sklo je studené na dotek, což při dlouhém hraní nebo práci není pro předloktí příjemné. Je na něm vidět každé smítko prachu a každý otisk prstu. A ta největší bolest? Cable management. Přes průhlednou desku nic neschováte, takže každý kabel pod stolem bude vidět.

**Verdikt:** Volba pro designové puristy, kteří mají dokonale vyvázané kabely a nevadí jim častější leštění.`,
      en: `## Laminate and MDF: Kings of value for money

If you're looking for functionality and don't want to spend your paycheck on a desk top, you'll probably end up in this category. You'll often encounter two abbreviations here: LTD and MDF. What's the difference?

- **LTD (Laminate):** This is a chipboard made from coarser particles, with a durable decorative foil covering the surface. It's lighter and the most affordable option. It's a "workhorse" that requires almost no maintenance.

- **MDF:** Here we're talking about a fiberboard. It's significantly denser, finer, and stronger than laminate. Thanks to its structure, it allows for more complex modifications like edge milling, and is often painted.

**Verdict:** Laminate wins if you want a maintenance-free desk at a great price. Choose MDF if you want something more durable with a more premium finish without going for real wood.

## Solid Wood: The scent of wood and touch of nature

A solid wood desk top (most commonly oak, beech, or ash) is the choice for those who want the highest quality. Solid wood is robust, heavy, and looks (and feels) luxurious at first glance.

**Pros:** Extreme durability. If you scratch the surface, you can sand it down and it's like new. Aesthetically, it's the ceiling – each piece is unique thanks to the wood grain.

**Cons:** Solid wood is a bit like a pet – you have to take care of it. It requires regular oiling or waxing. It's also more sensitive to liquids; spilled cola or coffee can leave a stain if you wipe it too late. And of course, prepare for a higher price tag.

**Verdict:** For connoisseurs who want uncompromising quality and don't mind giving their desk a little care in exchange for a premium look.

## Glass: High-tech design with a cool face

Tempered safety glass is a specific choice that can visually push your setup into the future. We often see it in designer "showroom" setups.

**Pros:** It looks great. Glass optically lightens the room, feels airy and modern. The surface is very easy to clean.

**Cons:** This is where we hit practicality issues. Glass is cold to the touch, which isn't pleasant for your forearms during long gaming or work sessions. Every speck of dust and fingerprint is visible. And the biggest pain? Cable management. You can't hide anything through a transparent surface, so every cable under the desk will be visible.

**Verdict:** A choice for design purists who have perfectly managed cables and don't mind frequent polishing.`
    },
    date: '2024-12-08',
    readTime: { cz: '5 min čtení', en: '5 min read' },
    category: { cz: 'Průvodce', en: 'Guide' }
  },
  {
    id: '3',
    slug: 'jak-vznikaji-produkty-4setup',
    title: {
      cz: 'Jak vznikají produkty 4setup',
      en: 'How 4setup products are made'
    },
    excerpt: {
      cz: 'Nebudeme vyrábět blbosti. Vlastní vývoj, vlastní chyby a materiály, které něco vydrží. Jak se z nápadu stane věc, kterou si můžete koupit?',
      en: 'We don\'t make junk. Our own development, our own mistakes, and materials that last. How does an idea become something you can buy?'
    },
    content: {
      cz: `Ve 4setup jsme si řekli jednu věc: nebudeme vyrábět blbosti. Trh je plný levných plastových „lapačů prachu", které sice fungují, ale hloubku nemají žádnou. My jsme si vybrali tu složitější cestu. Vlastní vývoj, vlastní chyby a materiály, které něco vydrží.

Jak se tedy z nápadu stane věc, kterou si můžete koupit?

## 1. Od myšlenky k modelu

Všechno začíná nápadem, jasně. Ale u nás to není tak, že nás něco napadne a hned to vyrábíme. Než vůbec zapneme počítač, sedneme si a dost tvrdě diskutujeme.

Ptáme se na rovinu: **Má to smysl? Není to zbytečnost? Bude to fakt unikátní?** Papír snese všechno, ale my ne. Pokud nás nápad nenadchne nebo nedává smysl, rovnou letí do koše. Nechceme kopírovat. Teprve když jsme si jistí, že to bude pecka, začínáme kreslit 3D návrh.

## 2. Testujeme, testujeme

Tohle je fáze, kterou moc neukazujeme, protože není zrovna „sexy". Stůl plný drátů, rozdělané součástky, pájka v ruce a všude poznámky.

Stavíme první prototypy a upřímně – vzhled v tuhle chvíli neřešíme. Jde o funkčnost.

- Zkoušíme, co vydrží elektronika.
- Hledáme limity materiálů.
- A často narážíme.

Fungujeme stylem pokus-omyl. Tři věci vyjdou, tři se pokazí. A je to tak správně. Raději tu chybu najdeme my teď v dílně, než abyste ji pak řešili vy doma. Ladíme to tak dlouho, dokud si nejsme jistí, že je to technicky neprůstřelné.

## 3. Finále a razítka

Když to funguje, zahazuje 3D výtisky a plasty. Nastupuje řemeslo. Chceme, aby produkt vypadal prémiově.

Ale tím to nekončí. Než to pustíme do světa, čeká nás ještě jedna věc – **razítka**. Zní to jako opruz, ale u světelných věcí a elektroniky jsou atestace a homologace nutnost. Děláme to proto, abychom měli černé na bílém, že to, co vám zasíláme, je 100% bezpečné a splňuje normy. Bez toho by to prostě nešlo.

## Výsledek?

Když se podíváte na náš hotový produkt, vidíte výsledek téhle cesty. Každý kousek má svůj příběh – od té první tečky na papíře až po hotový designový prvek.`,
      en: `At 4setup, we told ourselves one thing: we won't make junk. The market is full of cheap plastic "dust collectors" that work but have no depth. We chose the harder path. Our own development, our own mistakes, and materials that last.

So how does an idea become something you can buy?

## 1. From thought to model

Everything starts with an idea, obviously. But for us, it's not like we think of something and immediately start producing it. Before we even turn on the computer, we sit down and have some pretty tough discussions.

We ask directly: **Does it make sense? Is it unnecessary? Will it really be unique?** Paper can handle anything, but we can't. If the idea doesn't excite us or doesn't make sense, it goes straight in the trash. We don't want to copy. Only when we're sure it's going to be a hit do we start drawing the 3D design.

## 2. Testing, testing

This is the phase we don't show much because it's not exactly "sexy". A table full of wires, disassembled parts, soldering iron in hand, and notes everywhere.

We build the first prototypes and honestly – we don't care about looks at this point. It's about functionality.

- We test what the electronics can handle.
- We find the limits of materials.
- And we often hit walls.

We work by trial and error. Three things work out, three fail. And that's how it should be. We'd rather find the mistake now in the workshop than have you deal with it at home. We fine-tune it until we're sure it's technically bulletproof.

## 3. Final phase and certifications

When it works, we throw away the 3D prints and plastics. Craftsmanship takes over. We want the product to look premium.

But that's not the end. Before we release it to the world, there's one more thing – **certifications**. It sounds like a hassle, but for lighting products and electronics, attestations and homologations are a necessity. We do it so we have it in black and white that what we're sending you is 100% safe and meets standards. Without that, it simply wouldn't work.

## The result?

When you look at our finished product, you see the result of this journey. Every piece has its story – from that first dot on paper to the finished design element.`
    },
    date: '2024-12-05',
    readTime: { cz: '4 min čtení', en: '4 min read' },
    category: { cz: 'Z naší dílny', en: 'From our workshop' }
  },
  {
    id: '4',
    slug: 'tvorime-prostory-od-a-do-z',
    title: {
      cz: 'Od A–Z! Ve 4SETUP tvoříme prostory, které vás budou inspirovat.',
      en: 'From A to Z! At 4SETUP we create spaces that will inspire you.'
    },
    excerpt: {
      cz: 'Váš prostor je víc než jen čtyři stěny. Je to místo, kde se rodí nápady, kde pracujete nebo kde relaxujete po náročném dni u hry.',
      en: 'Your space is more than just four walls. It\'s where ideas are born, where you work, or where you relax after a hard day of gaming.'
    },
    content: {
      cz: `Váš prostor je víc než jen čtyři stěny. Je to místo, kde se rodí nápady, kde pracujete nebo kde relaxujete po náročném dni u hry. Ve 4setup věříme, že každý si zaslouží prostředí, které mu pomůže dostat ze sebe to nejlepší. Ať už jde o gaming room, reprezentativní kancelář nebo streamovací či podcastové studio.

## Kompletní realizace: Od A do Z!

Mnoho lidí má v hlavě nápad nebo sen, ale ztroskotá na realizaci. Výběr materiálů, technické řešení, ladění detailů – to vše stojí čas a energii. My to bereme na sebe. Naší specializací jsou kompletní návrhy a realizace na klíč.

Vy přijdete s nápadem (nebo jen touhou po změně) a my se postaráme o zbytek:

- **Profesionální 3D návrh:** Ještě než se poprvé „kopne", uvidíte svůj nový prostor ve fotorealistické kvalitě.
- **Technická příprava a realizace:** Zařídíme vše potřebné.
- **Finální předání:** Vy už jen převezmete hotový prostor.

## Na co se specializujeme?

Tvoříme pro lidi, kteří chtějí víc než jen průměr. Naše portfolio zahrnuje:

- 🎮 **Gaming rooms:** Herní doupata vyladěná do posledního LED pásku.
- 🎙️ **Podcastovny a studia:** Profesionální akustika a design pro tvůrce obsahu.
- 💼 **Moderní kanceláře a Home Office:** Místa, kde jde práce od ruky a zároveň reprezentují vaši značku.
- 🛋️ **Chill zóny:** Odpočinkové místnosti pro firmy i domácnosti.

## Pro koho tu jsme?

Nezáleží na tom, zda jste teenager, který sní o Youtube kariéře, manažer hledající klid na práci, nebo firma, která chce dopřát zaměstnancům špičkové zázemí. Jsme tu pro každého, kdo hledá funkčnost spojenou s nadstandardním designem.

**Máte projekt? Ozvěte se nám.** Nenechávejte své sny jen na papíře.`,
      en: `Your space is more than just four walls. It's where ideas are born, where you work, or where you relax after a hard day of gaming. At 4setup, we believe everyone deserves an environment that helps them bring out their best. Whether it's a gaming room, a representative office, or a streaming or podcast studio.

## Complete realization: From A to Z!

Many people have an idea or dream in their head but fail at implementation. Choosing materials, technical solutions, fine-tuning details – all of this takes time and energy. We take it on ourselves. Our specialty is complete turnkey designs and implementations.

You come with an idea (or just a desire for change) and we take care of the rest:

- **Professional 3D design:** Before the first "dig", you'll see your new space in photorealistic quality.
- **Technical preparation and implementation:** We arrange everything needed.
- **Final handover:** You just take over the finished space.

## What do we specialize in?

We create for people who want more than just average. Our portfolio includes:

- 🎮 **Gaming rooms:** Gaming dens tuned to the last LED strip.
- 🎙️ **Podcast rooms and studios:** Professional acoustics and design for content creators.
- 💼 **Modern offices and Home Office:** Places where work flows smoothly while representing your brand.
- 🛋️ **Chill zones:** Relaxation rooms for companies and households.

## Who are we here for?

It doesn't matter if you're a teenager dreaming of a YouTube career, a manager looking for peace to work, or a company that wants to give employees top-notch facilities. We're here for everyone looking for functionality combined with above-standard design.

**Got a project? Get in touch.** Don't leave your dreams just on paper.`
    },
    date: '2024-12-01',
    readTime: { cz: '3 min čtení', en: '3 min read' },
    category: { cz: 'Služby', en: 'Services' }
  }
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}

