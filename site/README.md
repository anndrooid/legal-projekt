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

## Publikacja zmian

Strona jest statyczna: po opublikowaniu zmian w Studio trzeba ją przebudować (`npm run build --workspace=frontend`).
Przy wdrożeniu ustawimy webhook Sanity → automatyczny build na hostingu.

## Ponowny import treści z makiet

```bash
cd studio
npx sanity exec scripts/seed.ts --with-user-token
```

Uwaga: nadpisuje dokumenty o tych samych ID (zmiany wprowadzone w Studio w tych dokumentach zostaną utracone).
