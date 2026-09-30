// SEO: opisy meta i dane strukturalne (schema.org, JSON-LD)
import { email, path, phone, type Lang } from "./site";

export const SITE_URL = "https://legal-projekt.vercel.app";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

/** Opis meta skrócony do ~155 znaków na granicy słowa (Google ucina dłuższe) */
export function metaDescription(text: string | undefined, max = 155) {
  if (!text) return undefined;
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:–-]+$/, "") + "…";
}

/** Tytuł strony: „Treść | ZMW Legal”, jeśli mieści się w ~65 znakach; inaczej sama treść */
export function pageTitle(base: string) {
  const full = `${base} | ZMW Legal`;
  return full.length <= 65 ? full : base;
}

const abs = (p: string) => new URL(p, SITE_URL).href;

/** Kancelaria (LegalService) — strona główna i kontakt */
export function organizationLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${SITE_URL}/#organization`,
    name: "ZMW Legal",
    legalName: "ZAWADZKA MROWIEC & WSPÓLNICY SP. K.",
    url: abs(path("home", lang)),
    logo: `${SITE_URL}/apple-touch-icon.png`,
    image: DEFAULT_OG_IMAGE,
    telephone: phone.href.replace("tel:", ""),
    email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ul. Wspólna 47A",
      postalCode: "00-684",
      addressLocality: "Warszawa",
      addressCountry: "PL",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:30",
      closes: "17:30",
    },
    areaServed: "PL",
    knowsLanguage: ["pl", "en"],
  };
}

export function personLd(p: {
  name: string;
  role: string;
  url: string;
  image?: string;
  email?: string;
  description?: string;
  languages?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    jobTitle: p.role,
    url: abs(p.url),
    ...(p.image ? { image: p.image } : {}),
    ...(p.email ? { email: p.email } : {}),
    ...(p.description ? { description: p.description } : {}),
    ...(p.languages?.length ? { knowsLanguage: p.languages } : {}),
    worksFor: { "@id": `${SITE_URL}/#organization`, "@type": "LegalService", name: "ZMW Legal" },
  };
}

export function articleLd(a: {
  title: string;
  description?: string;
  url: string;
  datePublished: string;
  image?: string;
  lang: Lang;
  authors?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.title.slice(0, 110),
    ...(a.description ? { description: a.description } : {}),
    url: abs(a.url),
    mainEntityOfPage: abs(a.url),
    datePublished: a.datePublished,
    inLanguage: a.lang === "en" ? "en-GB" : "pl-PL",
    image: a.image ?? DEFAULT_OG_IMAGE,
    author: a.authors?.length
      ? a.authors.map((name) => ({ "@type": "Person", name }))
      : { "@type": "Organization", name: "ZMW Legal" },
    publisher: {
      "@type": "Organization",
      name: "ZMW Legal",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-touch-icon.png` },
    },
  };
}
