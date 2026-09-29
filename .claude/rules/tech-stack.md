---
description: Stack technologiczny i dozwolone narzędzia
paths:
  - "**/*.html"
  - "site/**"
---

**Etap 1:** Statyczny HTML/CSS/JS budowany przez Claude Code — makiety w `context/*.html` (wzorzec wyglądu, nie edytujemy ich przy pracy nad `site/`).
**Etap 2 (w toku):** Astro + Sanity CMS (plan Free) w folderze `site/` — `site/frontend` (Astro, SSG) i `site/studio` (Sanity Studio).

W Sanity: Zespół (`person`) i Aktualności (`article`). Pozostałe podstrony statyczne w Astro.

Ograniczenia: wyłącznie bezpłatne narzędzia. Bez WordPressa, bez Webflow.
