// Dane wspólne dla nawigacji, menu mobilnego, stopki i kart — w obu językach.

export type Lang = "pl" | "en";
export const LANGS: Lang[] = ["pl", "en"];

export const phone = { display: "+48 22 319 47 60", href: "tel:+48223194760" };
export const email = "biuro@zmwlegal.pl";

// ---------------------------------------------------------------- ADRESY

/** Adresy stron w obu językach (klucz = identyfikator strony) */
export const routes = {
  home: { pl: "/", en: "/en" },
  team: { pl: "/nasz-zespol", en: "/en/our-team" },
  news: { pl: "/aktualnosci", en: "/en/news" },
  faq: { pl: "/faq", en: "/en/faq" },
  contact: { pl: "/kontakt", en: "/en/contact" },
  privacy: { pl: "/polityka-prywatnosci", en: "/en/privacy-policy" },
  "rozwiazywanie-sporow": { pl: "/rozwiazywanie-sporow", en: "/en/dispute-resolution" },
  "life-sciences": { pl: "/life-sciences", en: "/en/life-sciences" },
  "fundusze-pomoc-publiczna": { pl: "/fundusze-pomoc-publiczna", en: "/en/funds-and-state-aid" },
  digital: { pl: "/digital", en: "/en/digital" },
  "spory-podatkowe": { pl: "/spory-podatkowe", en: "/en/tax-disputes" },
} as const;
export type RouteKey = keyof typeof routes;

export const path = (key: RouteKey, lang: Lang) => routes[key][lang];

/** Czysty adres bieżącej strony (build zapisuje strony jako nazwa.html) */
export const cleanPath = (pathname: string) => pathname.replace(/(\/index)?\.html$/, "").replace(/(.)\/$/, "$1") || "/";
export const personPath = (slug: string, lang: Lang) => (lang === "en" ? `/en/team/${slug}` : `/zespol/${slug}`);
export const articlePath = (slug: string, lang: Lang) => (lang === "en" ? `/en/news/${slug}` : `/aktualnosci/${slug}`);

// ---------------------------------------------------------------- MENU

const PRACTICE_TEXT = {
  "rozwiazywanie-sporow": {
    pl: ["Rozwiązywanie Sporów", "Rozwiązywanie Sporów – spory korporacyjne, arbitraż i postępowania przed sądami powszechnymi i administracyjnymi."],
    en: ["Dispute Resolution", "Dispute Resolution – corporate disputes, arbitration and proceedings before common and administrative courts."],
  },
  "life-sciences": {
    pl: ["Life Sciences", "Prawo farmaceutyczne i żywnościowe – doradztwo regulacyjne, rejestracja produktów, audyty i postępowania."],
    en: ["Life Sciences", "Pharmaceutical and food law – regulatory advice, product registration, audits and proceedings."],
  },
  "fundusze-pomoc-publiczna": {
    pl: ["Fundusze i Pomoc Publiczna", "Ponad 4 mld zł pozyskanych dotacji i ulg podatkowych. Obsługa kontroli i postępowań spornych ze środków publicznych."],
    en: ["Funds & State Aid", "More than PLN 4 billion in grants and tax reliefs obtained. Support in audits and disputes over public funds."],
  },
  digital: {
    pl: ["Digital", "Telekomunikacja, ochrona danych, AI i e-commerce. Wsparcie prawne dla sektora technologicznego, mediów i nadawców."],
    en: ["Digital", "Telecoms, data protection, AI and e-commerce. Legal support for the technology sector, media and broadcasters."],
  },
  "spory-podatkowe": {
    pl: ["Spory Podatkowe", "Postępowania przed KAS, sądami administracyjnymi i TSUE. Strategia sporu, kontrole, odpowiedzialność zarządu."],
    en: ["Tax Disputes", "Proceedings before the National Revenue Administration, administrative courts and the CJEU. Dispute strategy, audits, management liability."],
  },
} as const;
type PracticeKey = keyof typeof PRACTICE_TEXT;

/** Praktyki w danym języku (klucz = wartość z Sanity) */
export const practices = (lang: Lang) =>
  (Object.keys(PRACTICE_TEXT) as PracticeKey[]).map((key) => ({
    key,
    href: path(key, lang),
    label: PRACTICE_TEXT[key][lang][0],
    desc: PRACTICE_TEXT[key][lang][1],
  }));

/** Praktyka po identyfikatorze z Sanity (np. "life-sciences") */
export const practiceBySlug = (slug: string | undefined, lang: Lang) => practices(lang).find((p) => p.key === slug);

export const nav = (lang: Lang) => ({
  team: { href: path("team", lang), label: lang === "en" ? "Our Team" : "Nasz Zespół" },
  practicesLabel: lang === "en" ? "Practices" : "Praktyki",
  after: [
    { href: path("news", lang), label: lang === "en" ? "News" : "Aktualności" },
    { href: path("faq", lang), label: "FAQ" },
    { href: path("contact", lang), label: lang === "en" ? "Contact" : "Kontakt" },
  ],
});

// ---------------------------------------------------------------- ZESPÓŁ I AKTUALNOŚCI

/** Grupy w siatce zespołu (kolejność wyświetlania) — wartości jak w schemacie Sanity */
export const tiers = (lang: Lang) =>
  [
    { value: "partner", label: lang === "en" ? "Partners" : "Partnerzy" },
    { value: "counsel", label: "Counsel" },
    { value: "associate", label: "Associates" },
    { value: "support", label: lang === "en" ? "Business support" : "Pozostały zespół" },
  ] as const;

/** PL: "1 osoba", "3 osoby", "5 osób"; EN: "1 person", "3 people" */
export function personCount(n: number, lang: Lang = "pl") {
  if (lang === "en") return n === 1 ? "1 person" : `${n} people`;
  if (n === 1) return "1 osoba";
  const last = n % 10;
  const lastTwo = n % 100;
  return last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14) ? `${n} osoby` : `${n} osób`;
}

/** Kategorie aktualności — wartość w Sanity jest po polsku, na stronie EN wyświetlamy tłumaczenie */
export const ARTICLE_CATEGORIES = ["Wyróżnienia", "Rankingi", "Zespół", "Publikacje", "Media", "Partnerstwa", "Transakcje"];
const CATEGORY_EN: Record<string, string> = {
  Wyróżnienia: "Awards",
  Rankingi: "Rankings",
  Zespół: "Team",
  Publikacje: "Publications",
  Media: "Media",
  Partnerstwa: "Partnerships",
  Transakcje: "Transactions",
};
export const categoryLabel = (value: string, lang: Lang) => (lang === "en" ? CATEGORY_EN[value] ?? value : value);
