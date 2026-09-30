---
description: Stack technologiczny i dozwolone narzędzia
paths:
  - "**/*.html"
  - "site/**"
---

**Etap 1:** Statyczny HTML/CSS/JS budowany przez Claude Code — makiety w `context/*.html` (wzorzec wyglądu, nie edytujemy ich przy pracy nad `site/`).
**Etap 2 (w toku):** Astro + Sanity CMS (plan Free) w folderze `site/` — `site/frontend` (Astro, SSG) i `site/studio` (Sanity Studio).

W Sanity: Zespół (`person`) i Aktualności (`article`), każdy dokument w wersji PL i EN (wtyczka `@sanity/document-internationalization`). Pozostałe podstrony statyczne w Astro.

Dwujęzyczność: PL bez prefiksu, EN pod `/en`. Po zmianie tekstów na polskiej stronie statycznej zaktualizuj tłumaczenia w `site/frontend/scripts/i18n/*.json` i uruchom `node scripts/i18n-static.mjs generate` (szczegóły: `site/README.md`).

Ograniczenia: wyłącznie bezpłatne narzędzia. Bez WordPressa, bez Webflow.
