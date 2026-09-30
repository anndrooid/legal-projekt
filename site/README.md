# ZMW Legal — strona (Astro + Sanity)

Monorepo utworzone z szablonu `sanity-io/sanity-template-astro-clean`.

- `frontend/` — strona w Astro (statyczna, generowana w czasie builda)
- `studio/` — Sanity Studio (panel do edycji treści)

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

- strona: http://localhost:4321
- Studio: http://localhost:3333

## Co jest w Sanity

| Typ | Gdzie na stronie |
|---|---|
| **Prawnik** (`person`) | `/nasz-zespol`, `/zespol/[slug]`, sekcja Zespół na stronie głównej |
| **Aktualność** (`article`) | `/aktualnosci`, `/aktualnosci/[slug]`, sekcja Aktualności na stronie głównej |

Pozostałe podstrony (praktyki, FAQ, kontakt, polityka prywatności) są statyczne — treść w `frontend/src/pages/*.astro`.

## Struktura frontendu

- `src/layouts/BaseLayout.astro` — `<head>`, nawigacja, stopka, Lenis
- `src/components/` — `Nav`, `Footer`, `Logo`, `PersonPhoto`, `SiteScripts`, `portable/*` (render treści artykułu)
- `src/data/site.ts` — telefon, e-mail, lista praktyk i menu
- `src/styles/pages/*.css` — style przeniesione 1:1 z makiet (`../context/*.html`), jeden plik na stronę
- `src/utils/sanity.ts` — zapytania GROQ i typy

## Adresy produkcyjne

- strona: https://legal-projekt.vercel.app (Vercel, Root Directory `site/frontend`, build przy każdym pushu na `master`)
- panel: https://zmw-legal.sanity.studio (wdrożenie: `cd studio && npx sanity deploy`)

## Publikacja zmian

Strona jest statyczna. Publikacja dokumentu `person` lub `article` w Studio uruchamia webhook Sanity
„Vercel – przebudowa strony” (Sanity → API → Webhooks), który wywołuje Deploy Hook Vercela
(Settings → Git → Deploy Hooks). Nowa wersja jest online po ok. 1–2 min.

## Wersje językowe (PL / EN)

- Polska wersja bez prefiksu (`/`, `/nasz-zespol`, `/aktualnosci/…`), angielska pod `/en` (`/en/our-team`, `/en/news/…`).
  Mapa adresów: `frontend/src/data/site.ts` (`routes`). Przełącznik PL / EN w menu prowadzi do odpowiednika tej samej strony.
- **Sanity** — wtyczka `@sanity/document-internationalization`. W Studio osobne listy „Zespół (PL/EN)” i „Aktualności (PL/EN)”;
  przycisk *Translations* w dokumencie tworzy/łączy tłumaczenie. Kategorie, praktyki i grupy mają wspólne wartości (po polsku),
  tłumaczone na stronie (`categoryLabel`, `practices(lang)`, `tiers(lang)`).
- **Strony z Sanity** (zespół, profile, aktualności, artykuły) — wspólne szablony w `frontend/src/views/`, teksty interfejsu w obu językach w szablonie.
- **Strony statyczne** (strona główna, praktyki, FAQ, kontakt, polityka) — wersja EN jest generowana z polskiej:
  ```bash
  cd frontend
  node scripts/i18n-static.mjs extract    # po zmianie tekstów PL: dopisuje nowe teksty do scripts/i18n/<strona>.json
  # uzupełnij puste tłumaczenia w scripts/i18n/*.json
  node scripts/i18n-static.mjs generate   # nadpisuje src/pages/en/*.astro
  ```
  Nie edytuj ręcznie `src/pages/en/<strona statyczna>.astro` — zmiany zostaną nadpisane przy kolejnym `generate`.

## Ponowny import treści z makiet

```bash
cd studio
npx sanity exec scripts/seed.ts --with-user-token
```

Uwaga: nadpisuje dokumenty o tych samych ID (zmiany wprowadzone w Studio w tych dokumentach zostaną utracone),
a także tworzy je bez pola `language` i bez wersji EN. Nie uruchamiaj go na produkcyjnym zbiorze danych.
