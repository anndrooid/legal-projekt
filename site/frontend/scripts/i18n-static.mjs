// Generowanie angielskich wersji stron statycznych z polskich plików .astro.
//   node scripts/i18n-static.mjs extract   → wypisuje teksty do przetłumaczenia (scripts/i18n/<strona>.json, puste wartości)
//   node scripts/i18n-static.mjs generate  → tworzy src/pages/en/*.astro z tłumaczeń
// Układ HTML pozostaje identyczny z wersją PL — podmieniane są tylko teksty, wybrane atrybuty i linki.
import fs from 'node:fs'
import path from 'node:path'

export const PAGES = {
  index: {pl: 'index.astro', en: 'index.astro', route: '/en', plRoute: '/'},
  'rozwiazywanie-sporow': {pl: 'rozwiazywanie-sporow.astro', en: 'dispute-resolution.astro', route: '/en/dispute-resolution', plRoute: '/rozwiazywanie-sporow'},
  'life-sciences': {pl: 'life-sciences.astro', en: 'life-sciences.astro', route: '/en/life-sciences', plRoute: '/life-sciences'},
  'fundusze-pomoc-publiczna': {pl: 'fundusze-pomoc-publiczna.astro', en: 'funds-and-state-aid.astro', route: '/en/funds-and-state-aid', plRoute: '/fundusze-pomoc-publiczna'},
  digital: {pl: 'digital.astro', en: 'digital.astro', route: '/en/digital', plRoute: '/digital'},
  'spory-podatkowe': {pl: 'spory-podatkowe.astro', en: 'tax-disputes.astro', route: '/en/tax-disputes', plRoute: '/spory-podatkowe'},
  faq: {pl: 'faq.astro', en: 'faq.astro', route: '/en/faq', plRoute: '/faq'},
  kontakt: {pl: 'kontakt.astro', en: 'contact.astro', route: '/en/contact', plRoute: '/kontakt'},
  'polityka-prywatnosci': {pl: 'polityka-prywatnosci.astro', en: 'privacy-policy.astro', route: '/en/privacy-policy', plRoute: '/polityka-prywatnosci'},
}

// Linki PL → EN (pozostałe strony)
const LINKS = {
  '/': '/en',
  '/nasz-zespol': '/en/our-team',
  '/aktualnosci': '/en/news',
  '/zespol/': '/en/team/',
  ...Object.fromEntries(Object.values(PAGES).map((p) => [p.plRoute, p.route])),
}

const ENTITIES = {amp: '&', lt: '<', gt: '>', quot: '"', nbsp: ' ', ndash: '–', mdash: '—', hellip: '…', middot: '·', oacute: 'ó', Oacute: 'Ó', copy: '©', Lstrok: 'Ł', lstrok: 'ł', bdquo: '„', rdquo: '”', ldquo: '“', rsquo: '’', lsquo: '‘', laquo: '«', raquo: '»'}
const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&([a-z]+);/gi, (m, e) => ENTITIES[e] ?? m)
const norm = (s) => decode(s).replace(/\s+/g, ' ').trim()

const ATTRS = ['alt', 'placeholder', 'aria-label', 'title']

// Dzieli plik na: frontmatter, markup (bez <script>/<style>), wstawki
function split(src) {
  const m = src.match(/^---\n[\s\S]*?\n---\n/)
  return {front: m ? m[0] : '', body: m ? src.slice(m[0].length) : src}
}

// Przechodzi po tekstach między tagami (poza script/style i wyrażeniami {…})
function mapTexts(body, fn) {
  const parts = body.split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->)/)
  return parts
    .map((part, idx) => {
      if (idx % 2 === 1) return part // script / style / komentarz
      return part.replace(/>([^<>]+)</g, (whole, text) => {
        if (/[{}]/.test(text) || !/[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]/.test(text)) return whole
        const out = fn(norm(text), text)
        if (out === undefined) return whole
        const lead = text.match(/^\s*/)[0]
        const trail = text.match(/\s*$/)[0]
        return `>${lead}${out}${trail}<`
      }).replace(new RegExp(`\\s(${ATTRS.join('|')})="([^"{}]*[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż][^"{}]*)"`, 'g'), (whole, attr, val) => {
        const out = fn(norm(val), val)
        return out === undefined ? whole : ` ${attr}="${out.replace(/"/g, '&quot;')}"`
      })
    })
    .join('')
}

const mode = process.argv[2]
const I18N_DIR = 'scripts/i18n'
fs.mkdirSync(I18N_DIR, {recursive: true})

for (const [name, cfg] of Object.entries(PAGES)) {
  const src = fs.readFileSync(path.join('src/pages', cfg.pl), 'utf8')
  const {front, body} = split(src)
  const title = (body.match(/<BaseLayout[^>]*\stitle="([^"]+)"/) || [])[1]
  const file = path.join(I18N_DIR, `${name}.json`)

  if (mode === 'extract') {
    const texts = new Set(title ? [norm(title)] : [])
    mapTexts(body, (t) => void texts.add(t))
    const prev = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {}
    const out = Object.fromEntries([...texts].map((t) => [t, prev[t] ?? '']))
    fs.writeFileSync(file, JSON.stringify(out, null, 2) + '\n')
    console.log(`${name}: ${texts.size} tekstów, brakuje ${Object.values(out).filter((v) => !v).length}`)
    continue
  }

  if (mode === 'generate') {
    const dict = JSON.parse(fs.readFileSync(file, 'utf8'))
    const missing = []
    const tr = (t) => {
      if (!(t in dict) || !dict[t]) return void missing.push(t)
      return dict[t]
    }
    let out = mapTexts(body, (t) => tr(t))
    // linki wewnętrzne
    out = out.replace(/href="(\/[^"#]*)(#[^"]*)?"/g, (whole, p, hash = '') => {
      if (p.startsWith('/images') || p.startsWith('/fonts')) return whole
      if (p.startsWith('/zespol/')) return `href="${p.replace('/zespol/', '/en/team/')}${hash}"`
      const to = LINKS[p]
      return to ? `href="${to}${hash}"` : whole
    })
    // BaseLayout: język, aktywna pozycja menu, odpowiednik PL
    out = out.replace(/<BaseLayout([^>]*)>/, (whole, attrs) => {
      // tytuł został już przetłumaczony razem z innymi atrybutami (title)
      const a = attrs.replace(/\salternate="[^"]*"/, '').replace(/\sactive="([^"]+)"/, (_, p) => ` active="${LINKS[p] ?? p}"`)
      return `<BaseLayout${a} lang="en" alternate="${cfg.plRoute}">`
    })
    // komponenty wymagające języka
    out = out.replace(/<PracticeTeam /g, '<PracticeTeam lang="en" ')
    // przyrostki liczników animowanych skryptem
    out = out.replace(/data-suffix=" mld"/g, 'data-suffix=" bn"')
    // frontmatter: ścieżki o poziom głębiej + język zapytań/formatowania
    let fm = front.replace(/from "\.\.\//g, 'from "../../').replace(/import "\.\.\//g, 'import "../../')
    fm = fm.replace(/getPeople\(\)/g, 'getPeople("en")').replace(/getArticles\(\)/g, 'getArticles("en")')
    out = out.replace(/formatDate\(([^)]*)\)/g, 'formatDate($1, "en")')
    out = out.replace(/`\/zespol\//g, '`/en/team/').replace(/`\/aktualnosci\//g, '`/en/news/')
    if (missing.length) {
      console.error(`${name}: brak tłumaczeń (${missing.length}):\n  ` + [...new Set(missing)].join('\n  '))
      process.exitCode = 1
      continue
    }
    const target = path.join('src/pages/en', cfg.en)
    fs.mkdirSync(path.dirname(target), {recursive: true})
    fs.writeFileSync(target, fm + out)
    console.log(`${name} → ${target}`)
  }
}
