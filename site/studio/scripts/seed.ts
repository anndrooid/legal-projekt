/**
 * Import treści z makiet (context/*.html) do Sanity.
 * Uruchom z folderu site/studio:
 *   npx sanity exec scripts/seed.ts --with-user-token
 *
 * Skrypt jest idempotentny — stałe _id, więc ponowne uruchomienie nadpisuje te same dokumenty.
 */
import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-03-26'})
const IMAGES = path.resolve(process.cwd(), '../../assets/images')

let keyCounter = 0
const key = () => `k${(keyCounter++).toString(36)}`

const uploaded = new Map<string, string>()
async function image(rel: string, hotspot?: {x: number; y: number}, extra: Record<string, unknown> = {}) {
  let assetId = uploaded.get(rel)
  if (!assetId) {
    const file = path.join(IMAGES, rel)
    const asset = await client.assets.upload('image', fs.createReadStream(file), {
      filename: path.basename(file),
    })
    assetId = asset._id
    uploaded.set(rel, assetId)
    console.log('  ↑', rel)
  }
  return {
    _type: 'image',
    asset: {_type: 'reference', _ref: assetId},
    // Mały obszar hotspota — przy width/height = 1 kółka w edytorze Sanity nie da się przesunąć
    ...(hotspot ? {hotspot: {_type: 'sanity.imageHotspot', ...hotspot, width: 0.3, height: 0.3}} : {}),
    ...extra,
  }
}

type Span = string | {text: string; marks: string[]}
const block = (children: Span[] | string, style = 'normal', listItem?: string) => ({
  _type: 'block',
  _key: key(),
  style,
  ...(listItem ? {listItem, level: 1} : {}),
  markDefs: [],
  children: (typeof children === 'string' ? [children] : children).map((c) =>
    typeof c === 'string'
      ? {_type: 'span', _key: key(), text: c, marks: []}
      : {_type: 'span', _key: key(), text: c.text, marks: c.marks},
  ),
})
const b = (text: string) => ({text, marks: ['strong']})
const i = (text: string) => ({text, marks: ['em']})
const withKeys = <T extends object>(items: T[], type?: string) =>
  items.map((it) => ({_key: key(), ...(type ? {_type: type} : {}), ...it}))

// ---------------------------------------------------------------- ZESPÓŁ
async function people() {
  const base = [
    {slug: 'anna-zawadzka', name: 'Prof. Anna Zawadzka', role: 'Managing Partner', tier: 'partner', spec: 'Rozwiązywanie Sporów · Prawo korporacyjne', practices: ['rozwiazywanie-sporow'], photo: 'anna-zawadzka.webp', pos: {x: 0.5, y: 0.12}},
    {slug: 'piotr-mrowiec', name: 'Piotr Mrowiec', role: 'Partner', tier: 'partner', spec: 'Fundusze i Pomoc Publiczna · Zachęty Rozwojowe', practices: ['fundusze-pomoc-publiczna'], photo: 'piotr-mrowiec.webp', pos: {x: 0.5, y: 0.15}},
    {slug: 'karolina-rychlewska', name: 'Karolina Rychlewska', role: 'Partner', tier: 'partner', spec: 'Life Sciences · Prawo farmaceutyczne', practices: ['life-sciences'], photo: 'karolina-rychlewska.webp', pos: {x: 0.55, y: 0.2}},
    {slug: 'michal-zaremba', name: 'Michał Zaremba', role: 'Counsel', tier: 'counsel', spec: 'Spory Podatkowe · Postępowania administracyjne', practices: ['spory-podatkowe'], photo: 'michal-zaremba.webp', pos: {x: 0.5, y: 0.15}},
    {slug: 'lukasz-baran', name: 'Łukasz Baran', role: 'Counsel', tier: 'counsel', spec: 'Digital · E-commerce · Ochrona danych', practices: ['digital'], photo: 'lukasz-baran.webp', pos: {x: 0.5, y: 0.15}},
    {slug: 'krzysztof-kowal', name: 'Krzysztof Kowal', role: 'Senior Associate', tier: 'associate', spec: 'Rozwiązywanie Sporów · Arbitraż', practices: ['rozwiazywanie-sporow'], photo: 'krzysztof-kowal.webp', pos: {x: 0.5, y: 0.15}},
    {slug: 'joanna-stachowiak', name: 'Joanna Stachowiak', role: 'Associate', tier: 'associate', spec: 'Life Sciences · Prawo farmaceutyczne', practices: ['life-sciences'], photo: 'joanna-stachowiak.webp', pos: {x: 0.5, y: 0.15}},
    {slug: 'marek-debowski', name: 'Marek Dębowski', role: 'Project Manager', tier: 'support', spec: '', practices: [], photo: 'marek-debowski.webp', pos: {x: 0.5, y: 0.15}},
  ]

  for (const [idx, p] of base.entries()) {
    const [first, ...rest] = p.name.replace(/^(Prof\.|Dr)\s+/, '').split(' ')
    const doc: Record<string, unknown> = {
      _id: `person-${p.slug}`,
      _type: 'person',
      name: p.name,
      slug: {_type: 'slug', current: p.slug},
      role: p.role,
      tier: p.tier,
      order: (idx + 1) * 10,
      specialization: p.spec || undefined,
      practices: p.practices,
      photo: await image(`team/${p.photo}`, p.pos),
      email: `${first[0].toLowerCase()}.${rest.join('-').toLowerCase()}@zmwlegal.pl`
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/ł/g, 'l'),
      phone: '+48 22 319 47 60',
    }
    if (p.slug === 'anna-zawadzka') Object.assign(doc, await zawadzkaProfile())
    await client.createOrReplace(doc as never)
    console.log('✓ person', p.name)
  }
}

async function zawadzkaProfile() {
  return {
    email: 'a.zawadzka@zmwlegal.pl',
    tags: ['Rozwiązywanie Sporów', 'Prawo korporacyjne'],
    lead: 'Managing Partner kancelarii ZMW Legal · Profesor zwyczajny Wydziału Prawa i Administracji Uniwersytetu Jagiellońskiego. Specjalizuje się w sporach korporacyjnych, prawie spółek handlowych i prawie kontraktów handlowych.',
    bioHeading: 'O Profesor Zawadzkiej',
    bio: [
      block('Prof. Anna Zawadzka jest Managing Partnerem kancelarii ZMW Legal i profesorem zwyczajnym Wydziału Prawa i Administracji Uniwersytetu Jagiellońskiego. Specjalizuje się w prawie spółek handlowych, sporach korporacyjnych i prawie kontraktów handlowych.'),
      block('Łączy akademicką precyzję z praktyczną skutecznością – reprezentuje klientów przed sądami wszystkich instancji, trybunałami arbitrażowymi (w tym Sądem Arbitrażowym przy KIG oraz ICC) oraz Sądem Najwyższym. Jest autorką ponad 30 publikacji naukowych, w tym powszechnie cytowanej monografii o sporach korporacyjnych i ochronie akcjonariuszy mniejszościowych.'),
      block('Od 2023 roku jest członkinią Komisji Kodyfikacyjnej Prawa Cywilnego przy Radzie Ministrów, pracującej nad nowelizacją przepisów prawa prywatnego.'),
    ],
    experience: [
      'Reprezentacja zarządu dużej spółki giełdowej w sporze o naprawienie szkody wyrządzonej przez byłego prezesa (wartość przedmiotu sporu: ponad 50 mln zł)',
      'Obrona spółki dominującej w wieloletnim sporze korporacyjnym z mniejszościowymi akcjonariuszami przed Sądem Arbitrażowym przy Konfederacji Lewiatan',
      'Doradztwo dla rady nadzorczej w postępowaniu o stwierdzenie nieważności uchwały zarządu o istotnym znaczeniu dla grupy kapitałowej',
      'Reprezentacja klientów instytucjonalnych w postępowaniach o zaskarżenie uchwał zgromadzenia wspólników w sporach wielostronnych',
      'Prowadzenie sporu korporacyjnego o ochronę praw mniejszościowych akcjonariuszy na tle transakcji przymusowego wykupu (squeeze-out)',
      'Doradztwo strategiczne przy restrukturyzacji złożonej grupy kapitałowej w kontekście odpowiedzialności organów spółki',
      'Reprezentacja przed Sądem Najwyższym w sprawach dotyczących ważności czynności prawnych dokonanych przez zarząd z przekroczeniem umocowania',
    ],
    awards: withKeys([
      {text: 'Chambers Europe – Band 1, Dispute Resolution (Polska)', years: '2024, 2023'},
      {text: 'Chambers Global – Band 2, Dispute Resolution (Polska)', years: '2026, 2025'},
      {text: 'Legal 500 – Leading Individual, Litigation', years: '2024'},
      {text: 'Dziennik Gazeta Prawna – Ranking Najlepszych Prawników, Prawo Spółek', years: '2023, 2022'},
      {text: 'Forbes Women to Watch – wyróżnienie za wkład w rozwój polskiej praktyki prawniczej', years: '2022'},
    ], 'award'),
    otherActivities: [
      'Profesor zwyczajny, Wydział Prawa i Administracji Uniwersytetu Jagiellońskiego, Katedra Prawa Handlowego – wykłady z prawa spółek handlowych i prawa kontraktów handlowych',
      'Członkini Komisji Kodyfikacyjnej Prawa Cywilnego przy Radzie Ministrów (od 2023)',
      'Arbiter Sądu Arbitrażowego przy Krajowej Izbie Gospodarczej (KIG)',
      'Członkini Rady Naukowej „Kwartalnika Prawa Prywatnego" (wydawnictwo C.H. Beck)',
      'Regularne wystąpienia na konferencjach poświęconych sporowi korporacyjnemu, corporate governance i odpowiedzialności organów spółek',
    ],
    education: withKeys([
      {degree: 'Tytuł profesora nauk prawnych', institution: 'Rada Doskonałości Naukowej', year: '2020'},
      {degree: 'Habilitacja', institution: 'Wydział Prawa i Administracji, Uniwersytet Jagielloński', note: '"Spory korporacyjne: aspekty materialnoprawne i procesowe"', year: '2012'},
      {degree: 'Doktorat z wyróżnieniem', institution: 'Wydział Prawa i Administracji, Uniwersytet Jagielloński', note: 'Promotor: prof. dr hab. Marek Kowalewski', year: '2005'},
      {degree: 'Magisterium z wyróżnieniem', institution: 'Wydział Prawa i Administracji, Uniwersytet Jagielloński', year: '2001'},
    ], 'educationItem'),
    languages: withKeys([
      {name: 'Polski', level: 'Ojczysty', dots: 5},
      {name: 'Angielski', level: 'Biegły (C2) · International Arbitration', dots: 5},
      {name: 'Francuski', level: 'Komunikatywny (B2)', dots: 3},
    ], 'language'),
    publications: withKeys([
      {cover: await image('publications/spory-korporacyjne-aspekty-materialnoprawne-procesowe.webp'), tag: 'Monografia · Redakcja naukowa', title: 'Spory korporacyjne. Aspekty materialnoprawne i procesowe. Wyd. 2', meta: 'C.H. Beck, Warszawa 2023'},
      {cover: await image('publications/ochrona-akcjonariuszy-mniejszosciowych.webp'), tag: 'Monografia', title: 'Ochrona akcjonariuszy mniejszościowych w sporach korporacyjnych', meta: 'Wolters Kluwer, Warszawa 2020'},
      {cover: await image('publications/arbitraz-korporacyjny-w-praktyce.webp'), tag: 'Monografia', title: 'Arbitraż korporacyjny w praktyce. Zagadnienia wybrane', meta: 'LexisNexis, Warszawa 2015'},
    ], 'publication'),
  }
}

// ---------------------------------------------------------------- AKTUALNOŚCI
async function articles() {
  const list = [
    {slug: 'chambers-europe-2024-dispute-resolution', date: '2024-06-03', cat: 'Rankingi', featured: true, source: 'Chambers and Partners', cover: 'articles/zmw-legal-ranking-chambers-europe-2024.webp', title: 'ZMW Legal w rankingu Chambers Europe 2024. Recommended Firm w kategorii Dispute Resolution', excerpt: 'Kancelaria ZMW Legal po raz kolejny znalazła się w prestiżowym rankingu Chambers Europe, uzyskując rekomendację w kluczowej dla nas kategorii Dispute Resolution.'},
    {slug: 'karolina-rychlewska-nagroda-business-centre-club', date: '2024-05-18', cat: 'Wyróżnienia', cover: 'articles/karolina-rychlewska-nagroda-business-centre-club.webp', title: 'Karolina Rychlewska wyróżniona nagrodą Business Centre Club za wkład w rozwój prawa korporacyjnego', excerpt: 'Managing Partner kancelarii ZMW Legal otrzymała nagrodę BCC dla wybitnych prawników. Kapituła doceniła dorobek naukowy i praktyczny w dziedzinie sporów korporacyjnych.', people: [['karolina-rychlewska']]},
    {slug: 'ranking-kancelarii-warszawskiego-city-2024', date: '2024-04-22', cat: 'Rankingi', cover: 'articles/zmw-legal-ranking-warszawskie-city-2024.webp', title: 'ZMW Legal w rankingu najlepszych kancelarii warszawskiego City 2024', excerpt: 'Kancelaria po raz kolejny znalazła się w czołówce zestawienia firm prawniczych działających w sercu biznesowej Warszawy, docenionych za bliskość klientów korporacyjnych i nowoczesne zaplecze biurowe.'},
    {slug: 'jakub-stelmach-marta-kowalczyk-nowi-partnerzy', date: '2024-03-01', cat: 'Zespół', cover: 'articles/jakub-stelmach-marta-kowalczyk-nowi-partnerzy.webp', coverPos: {x: 0.5, y: 0}, title: 'Dr Jakub Stelmach i Marta Kowalczyk dołączają do ZMW Legal jako Partnerzy', excerpt: 'Kancelaria umacnia kadrę partnerską. Dr Jakub Stelmach to specjalista od sporów podatkowych, Marta Kowalczyk – od prawa korporacyjnego i transakcji.'},
    {slug: 'legal-500-emea-2024-band-1-dispute-resolution', date: '2024-02-15', cat: 'Rankingi', title: 'ZMW Legal w rankingu Legal 500 EMEA 2024: Band 1 w kategorii Dispute Resolution', excerpt: 'Prestiżowy ranking Legal 500 umieścił kancelarię w pierwszej grupie najlepszych firm w Polsce w obszarze rozwiązywania sporów. Indywidualne wyróżnienia dla czterech prawników.'},
    {slug: 'partnerstwo-z-wpia-uniwersytetu-warszawskiego', date: '2024-01-10', cat: 'Partnerstwa', title: 'ZMW Legal nawiązuje partnerstwo z Wydziałem Prawa Uniwersytetu Warszawskiego', excerpt: 'Kancelaria dołącza do grona patronów strategicznych WPiA UW. Wspólne projekty edukacyjne, praktyki studenckie i seminaria naukowe.'},
    {slug: 'fuzja-w-sektorze-farmaceutycznym-200-mln', date: '2023-12-05', cat: 'Transakcje', title: 'ZMW Legal doradzało przy największej fuzji w sektorze farmaceutycznym – transakcja powyżej 200 mln zł', excerpt: 'Zespół ZMW Legal pod kierunkiem Karoliny Rychlewskiej przeprowadził obsługę prawną fuzji dwóch spółek z sektora Life Sciences.', people: [['karolina-rychlewska']], practice: 'life-sciences'},
    {slug: 'european-tax-law-conference-amsterdam', date: '2023-11-18', cat: 'Media', title: 'Tomasz Nowicki prelegentem na European Tax Law Conference w Amsterdamie', excerpt: 'Partner kancelarii ZMW Legal wziął udział w panelu poświęconym harmonizacji unijnych przepisów o rozliczaniu dotacji i pomocy publicznej.'},
    {slug: 'komentarz-do-nowelizacji-ksh-spolki-holdingowe', date: '2023-10-02', cat: 'Publikacje', title: 'Nowe regulacje dotyczące spółek holdingowych – komentarz ekspertów ZMW Legal do nowelizacji KSH', excerpt: 'Prof. Zawadzka i dr Stelmach opublikowali szczegółowy komentarz do zmian w Kodeksie spółek handlowych. Analiza dotyczy odpowiedzialności zarządów spółek zależnych.', people: [['anna-zawadzka']]},
    {slug: 'piotr-mrowiec-whos-who-legal-litigation-2024', date: '2023-09-15', cat: 'Wyróżnienia', title: "Piotr Mrowiec w gronie wyróżnionych przez Who's Who Legal: Litigation 2024", excerpt: "Partner zarządzający kancelarii został wymieniony w prestiżowym przewodniku Who's Who Legal jako jeden z czołowych polskich specjalistów w obszarze litigation.", people: [['piotr-mrowiec']]},
  ] as Array<{
    slug: string; date: string; cat: string; title: string; excerpt: string
    featured?: boolean; source?: string; cover?: string; coverPos?: {x: number; y: number}
    people?: [string, string?][]; practice?: string
  }>

  for (const a of list) {
    const doc: Record<string, unknown> = {
      _id: `article-${a.slug}`,
      _type: 'article',
      title: a.title,
      slug: {_type: 'slug', current: a.slug},
      publishedAt: a.date,
      category: a.cat,
      excerpt: a.excerpt,
      featured: !!a.featured,
      source: a.source,
      practice: a.practice,
      cover: a.cover ? await image(a.cover, a.coverPos ?? {x: 0.5, y: 0.5}, {alt: a.title}) : undefined,
      people: a.people?.map(([slug, note]) => ({
        _key: key(),
        _type: 'personMention',
        person: {_type: 'reference', _ref: `person-${slug}`},
        note,
      })),
    }
    if (a.featured) Object.assign(doc, await chambersBody())
    await client.createOrReplace(doc as never)
    console.log('✓ article', a.title.slice(0, 60))
  }
}

async function chambersBody() {
  return {
    practice: 'rozwiazywanie-sporow',
    tags: ['Chambers Europe', 'Dispute Resolution', 'Rankingi', 'Spory korporacyjne'],
    people: [
      {_key: key(), _type: 'personMention', person: {_type: 'reference', _ref: 'person-anna-zawadzka'}, note: 'Band 1'},
      {_key: key(), _type: 'personMention', person: {_type: 'reference', _ref: 'person-piotr-mrowiec'}, note: 'Band 2'},
    ],
    body: [
      block('Chambers and Partners to jeden z najbardziej wpływowych rankingów prawniczych na świecie. Rekomendacja w Chambers Europe opiera się na dogłębnej analizie realizowanych spraw, wywiadach z klientami i oceną niezależnych prawników z branży.', 'lead'),
      block(['Wyróżnienie ZMW Legal w kategorii ', b('Dispute Resolution: Corporate & Commercial'), ' potwierdza pozycję kancelarii jako jednego z wiodących podmiotów w Polsce w zakresie prowadzenia sporów korporacyjnych. W tegorocznym wydaniu rankingu kancelaria awansowała do wyższego bandu, co jest efektem kilkuletniej konsekwentnej pracy zespołu.']),
      block('Indywidualne wyróżnienia dla prawników ZMW Legal', 'h2'),
      block('Chambers Europe wyróżniło indywidualnie dwoje prawników kancelarii:'),
      block([b('Prof. Anna Zawadzka'), ' – utrzymała pozycję w Band 1, z opisem podkreślającym jej „unikalną kombinację wiedzy akademickiej i umiejętności praktycznych w najtrudniejszych sporach korporacyjnych".'], 'normal', 'bullet'),
      block([b('Piotr Mrowiec'), ' – awansował do Band 2, doceniony za „wyjątkową efektywność w sprawach dotyczących odpowiedzialności zarządu i sporów między wspólnikami".'], 'normal', 'bullet'),
      {_type: 'quote', _key: key(), text: '„ZMW Legal wyróżnia się zdolnością do prowadzenia niezwykle złożonych sporów korporacyjnych z precyzją i determinacją. Klientów imponuje ich strategiczne podejście już na etapie planowania sporu."', cite: '– Chambers and Partners, edycja 2024'},
      block('Metodologia rankingu', 'h2'),
      block('Ranking Chambers Europe budowany jest na podstawie ankiet rozesłanych do kilku tysięcy prawników i ich klientów w całej Europie. Ocenie podlegają m.in. jakość świadczonych usług, podejście do klienta, innowacyjność, a przede wszystkim rzeczywiste wyniki osiągane w sprawach.'),
      block('Kancelarie są oceniane niezależnie przez ekspertów Chambers i przyporządkowywane do czterech bandów (Band 1 to najwyższy) lub kategorii „Recognised Practitioner". ZMW Legal jest wymieniana w rankingu nieprzerwanie od kilku lat.'),
      {_key: key(), ...(await image('articles/zmw-legal-praktyka-rozwiazywania-sporow.webp', {x: 0.5, y: 0.5}, {alt: 'Praktyka rozwiązywania sporów ZMW Legal'}))},
      block('Kontekst i znaczenie wyróżnienia', 'h2'),
      block('Wyróżnienie zbiega się z kolejnym rekordowym rokiem dla praktyki Rozwiązywania Sporów w ZMW Legal. W 2023–2024 kancelaria prowadziła kilkanaście spraw o wartości powyżej 50 mln zł każda, z których większość zakończyła się sukcesem dla klienta na etapie pierwszej instancji.'),
      block('Wśród spraw wyróżnionych przez Chambers znalazły się procesy z zakresu odpowiedzialności zarządu w spółkach publicznych, spory między wspólnikami o wyłączenie ze spółki oraz postępowania zabezpieczające o bezprecedensowym zakresie.'),
      block('Komentarz kancelarii', 'h2'),
      block(['Prof. Anna Zawadzka, Managing Partner ZMW Legal: ', i('„Wyróżnienie Chambers Europe jest dla nas potwierdzeniem, że obrana strategia – głęboka specjalizacja i bezkompromisowe podejście do każdej sprawy – przynosi efekty nie tylko naszym klientom, ale jest też dostrzegane przez rynek. Jesteśmy dumni z całego zespołu."')]),
    ],
  }
}

people()
  .then(articles)
  .then(() => console.log('Gotowe.'))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
