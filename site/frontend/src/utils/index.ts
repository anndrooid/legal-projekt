import type { Lang } from "../data/site";

/** Data: PL "3 czerwca 2024", EN "3 June 2024" */
export function formatDate(date: string, lang: Lang = "pl") {
  return new Date(date).toLocaleDateString(lang === "en" ? "en-GB" : "pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
