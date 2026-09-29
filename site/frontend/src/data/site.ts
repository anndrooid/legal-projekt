// Dane wspólne dla nawigacji, menu mobilnego i stopki.

export const phone = { display: "+48 22 319 47 60", href: "tel:+48223194760" };
export const email = "biuro@zmwlegal.pl";

export const practices = [
  {
    href: "/rozwiazywanie-sporow",
    label: "Rozwiązywanie Sporów",
    desc: "Rozwiązywanie Sporów – spory korporacyjne, arbitraż i postępowania przed sądami powszechnymi i administracyjnymi.",
  },
  {
    href: "/life-sciences",
    label: "Life Sciences",
    desc: "Prawo farmaceutyczne i żywnościowe – doradztwo regulacyjne, rejestracja produktów, audyty i postępowania.",
  },
  {
    href: "/fundusze-pomoc-publiczna",
    label: "Fundusze i Pomoc Publiczna",
    desc: "Ponad 4 mld zł pozyskanych dotacji i ulg podatkowych. Obsługa kontroli i postępowań spornych ze środków publicznych.",
  },
  {
    href: "/digital",
    label: "Digital",
    desc: "Telekomunikacja, ochrona danych, AI i e-commerce. Wsparcie prawne dla sektora technologicznego, mediów i nadawców.",
  },
  {
    href: "/spory-podatkowe",
    label: "Spory Podatkowe",
    desc: "Postępowania przed KAS, sądami administracyjnymi i TSUE. Strategia sporu, kontrole, odpowiedzialność zarządu.",
  },
];

export const pagesAfterPractices = [
  { href: "/aktualnosci", label: "Aktualności" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
];

export const team = { href: "/nasz-zespol", label: "Nasz Zespół" };

/** Nazwa praktyki po jej identyfikatorze z Sanity (np. "life-sciences") */
export const practiceBySlug = (slug?: string) => practices.find((p) => p.href === `/${slug}`);

/** Grupy w siatce zespołu (kolejność wyświetlania) — wartości jak w schemacie Sanity */
export const tiers = [
  { value: "partner", label: "Partnerzy" },
  { value: "counsel", label: "Counsel" },
  { value: "associate", label: "Associates" },
  { value: "support", label: "Pozostały zespół" },
] as const;

/** "1 osoba", "3 osoby", "5 osób", "22 osoby" */
export function personCount(n: number) {
  if (n === 1) return "1 osoba";
  const last = n % 10;
  const lastTwo = n % 100;
  return last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14) ? `${n} osoby` : `${n} osób`;
}
