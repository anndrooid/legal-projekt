# DESIGN SYSTEM — BLSK Legal

## 1. Filozofia

Strona ma sprawiać wrażenie kancelarii, która nie musi się starać — pewna swojej ekspertyzy, zwięzła, bez ozdobników. Dużo powietrza, minimalna paleta, typografia, która nosi ciężar autorytetu zamiast ikonografii. Nie onieśmielamy bogactwem, ale precyzją.

---

## 2. Kolory

| Token | Wartość | Gdzie się tego używa |
|---|---|---|
| `accent` | `#8C0002` | Przyciski CTA, eyebrow labels, tagi sekcji, numer telefonu w nav, hover na linkach, aktywny element nawigacji |
| `text` | `#1a2440` | Cały tekst na jasnym tle — nagłówki, akapity, opisy kart |
| `surface` | `#f6f6f4` | Tło strony, naprzemienne sekcje (ciepła biel), tło navu po przewinięciu |
| `surface-white` | `#ffffff` | Tło kart (team, news, corpo snap), białe sekcje (intro, praktyki) |
| `surface-dark` | `#1a2440` | Tło sekcji „Jak pracujemy" i „Kontakt" |
| `surface-footer` | `#0f1628` | Tło stopki |
| `border` | `rgba(26,36,64,.12)` | Obramowania kart, separatory poziome, siatka statystyk |

**Uwagi o kontraście:**
- `text` (#1a2440) na `surface-white`: ~15.7:1 ✓
- `accent` (#8C0002) na `surface-white`: ~9.6:1 ✓
- Biały tekst na `surface-dark`: ~15.7:1 ✓
- `rgba(255,255,255,.45)` na `surface-footer`: ~5.1:1 ✓ (linki w stopce — marginalny pass, monitorować)

---

## 3. Typografia

Dwa kroje: **Raleway** (nagłówki, nav, buttony, etykiety) i **Open Sans** (treść, formularze).

| Klasa / rola | Rozmiar | Weight | Krój | Użycie |
|---|---|---|---|---|
| `stat-num` | clamp(3.5rem, 7vw, 7.5rem) | 400 | Raleway | Licznik statystyk (29, 5, 20+, 6 mld) |
| `h1-hero` | clamp(3rem, 7.5vw, 6.5rem) | 600 | Raleway | Główny nagłówek hero |
| `ph-title` | clamp(3rem, 7.5vw, 6.5rem) | 600 | Raleway | Nagłówek strony wewnętrznej (praktyki, zespół) |
| `h2-sec` | clamp(2.25rem, 4vw, 4rem) | 600 | Raleway | Nagłówki sekcji na home |
| `kt-h2` | clamp(2rem, 3.5vw, 3.5rem) | 500 | Raleway | Nagłówek sekcji kontakt |
| `card-title` | 1.3rem | 700 | Raleway | Tytuły kart: `.prac-name`, `.step-title`, `.team-name`, `.cs-title`, `.news-title` |
| `h3-card` | clamp(1.2rem, 1.8vw, 1.75rem) | 500 | Raleway | ⚠ Klasa zdefiniowana w CSS, nieużyta w żadnym wireframie — rezerwa na przyszłe karty (profil prawnika) |
| `lead` | clamp(1rem, 1.3vw, 1.375rem) | 400 | Open Sans | Teksty wstępne sekcji |
| `label` | 1.2rem | 300 | Raleway | Eyebrow labels (uppercase, letter-spacing .14em) |
| `body` | 1.125rem | 400 | Open Sans | Ciało tekstu, opisy kart |
| `nav-link` | 1rem | 500 | Raleway | Linki nawigacyjne |
| `stat-lbl` | 0.9rem | 400 | Open Sans | Opis pod licznikiem statystyk |
| `card-desc` | 0.875–0.95rem | 400 | Open Sans | Opisy w kartach (prac-desc, cs-desc, news-exc, step-desc) |
| `ph-back` | 1.2rem | 300 | Open Sans | Breadcrumb / link powrotu na stronie wewnętrznej (hover → accent) |
| `srv-num` | 2rem | 300 | Raleway | Numer pozycji w liście usług (letter-spacing .18em, kolor rgba(255,255,255,.3)) |
| `srv-title` | 2rem | 400 | Raleway | Tytuł pozycji w liście usług — kolor #f6f6f4 na ciemnym tle |
| `srv-desc` | 1rem | 300 | Open Sans | Opis pozycji w liście usług — kolor rgba(255,255,255,.7), line-height 1.78 |
| `btn-primary` | 0.9rem | 600 | Raleway | Tekst przycisku wypełnionego |
| `btn-link` | 0.95rem | 600 | Raleway | Tekst przycisku ghost / link z strzałką |
| `micro-label` | 0.63rem | 600 | Raleway | Etykiety kategorii, tagi (uppercase, letter-spacing .12em) |

---

## 4. Odstępy

Skala oparta na 4px (1 jednostka = 0.25rem).

| Token | rem | px | Przykładowe użycie |
|---|---|---|---|
| `space-1` | 0.25rem | 4px | marginesy minimalne |
| `space-2` | 0.5rem | 8px | odstęp ikony od tekstu, gap w btn-row |
| `space-3` | 0.75rem | 12px | margin-bottom pod eyebrow label |
| `space-4` | 1rem | 16px | gap między kartami news/corpo snap |
| `space-5` | 1.25rem | 20px | wiersze danych kontaktowych (kt-rows) |
| `space-6` | 1.5rem | 24px | padding kart (news, team body) |
| `space-8` | 2rem | 32px | padding pionowy navu, margin-bottom card-title |
| `space-10` | 2.5rem | 40px | padding sekcji phone w menu mobilnym |
| `space-12` | 3rem | 48px | padding poziomy strony (desktop), kolumny approach |
| `space-14` | 3.5rem | 56px | margin-bottom pod h2 w sekcjach |
| `space-16` | 4rem | 64px | gap w siatce intro |
| `space-18` | 4.5rem | 72px | padding pionowy komórki statystyk |
| `space-20` | 5rem | 80px | padding top stopki |
| `section` | 7vw | fluid | padding pionowy sekcji (desktop); 12vw mobile |

---

## 5. Kształty i głębia

**Promienie:**

| Token | Wartość | Gdzie |
|---|---|---|
| `radius-sm` | 3px | Logo placeholder, stopka logo |
| `radius-md` | 8px | Karty (team, news, corpo snap, praktyki), przycisk CTA, dropdown nav |
| `radius-full` | 50% | Okrągłe przyciski strzałkowe (btn-c) |
| `radius-pill` | 1.4rem | Tagi/chipy strony wewnętrznej (ph-tag) |

**Obramowania:**
- Karty i siatki: `1px solid rgba(26,36,64,.12)`
- Podkreślenia pola formularza (na ciemnym tle): `1.5px solid rgba(255,255,255,.25)`
- Separator sekcji usług: `1px solid rgba(255,255,255,.1)`

**Cienie:**
- `0 12px 40px rgba(26,36,64,.12)` — wyłącznie dropdown menu nawigacji
- Karty: bez box-shadow, separacja przez border

---

## 6. Komponenty do zaprojektowania

### Nawigacja i menu

| Nazwa | Po co |
|---|---|
| `TopNav` | Globalna nawigacja — logo, linki, numer telefonu, hamburger |
| `NavDropdown` | Podmenu praktyk na hover |
| `MobileMenu` | Pełnoekranowe menu na tablet i telefon |

### Sekcje globalne

| Nazwa | Po co |
|---|---|
| `HeroSection` | Pełnoekranowy header z placeholderem zdjęcia i cue przewijania |
| `StatsStrip` | Pasek czterech liczników (29 prawników, 5 obszarów…) |
| `RankingsStrip` | Pasek z logotypami rankingów i wyróżnień |
| `Footer` | Stopka — cztery kolumny linków, adres, copyright |

### Karty i bloki treści

| Nazwa | Po co |
|---|---|
| `PracticeCard` | Karta praktyki z ikoną, tytułem, opisem i linkiem |
| `ApproachStep` | Blok kroku procesu (numer, tytuł, opis) w ciemnej sekcji |
| `TeamCard` | Karta prawnika — zdjęcie, imię, rola, link do profilu |
| `TeamCountBar` | Belka pod siatką zespołu z CTA do pełnej listy |
| `CorpoSnapCard` | Karta odcinka wideo — miniatura 16:9, tag, tytuł, opis |
| `NewsCard` | Karta aktualności — data, tytuł, zajawka, link |

### Strony wewnętrzne

| Nazwa | Po co |
|---|---|
| `PageHeader` | Nagłówek strony wewnętrznej (praktyki, zespół) — breadcrumb, tytuł, opis, tagi |
| `ServiceRow` | Wiersz usługi w liście numerowanej (praktyki detail) |
| `TagChip` | Pill z etykietą specjalizacji |

### Formularze i kontakt

| Nazwa | Po co |
|---|---|
| `ContactSection` | Sekcja kontaktowa — dane kancelarii + formularz |
| `FormField` | Pole tekstowe i textarea w stylu underline (na ciemnym tle) |

### Przyciski

| Nazwa | Po co |
|---|---|
| `ButtonPrimary` | Wypełniony crimson, ikona strzałki lub tekst |
| `ButtonCircle` | Okrągły przycisk strzałkowy (duży i mały wariant) |
| `ButtonLink` | Link z strzałką (ghost), jasna i ciemna wersja |

---

### ServiceRow — wzorzec układu sekcji „Zakres usług"

Jedyny powtarzalny układ zaprojektowany przez klienta — stosować bez zmian struktury.

**Tło sekcji:** `surface-dark` (#1a2440), padding `10vw 0`.

**Nagłówek sekcji:**
- Eyebrow label (`label`) → h2 (`h2-sec`, kolor #fff, font-size 5rem override)
- margin-bottom `4rem` przed listą

**Lista usług — struktura powtarzalna:**
```
[srv-divider]  ← 1px linia rgba(255,255,255,.1)
[service-row]
  [div]
    [srv-num]    ← "01", "02"…
    [srv-title]  ← nazwa usługi
  [srv-desc]     ← opis (ukryty na tablecie/telefonie, rozwijany kliknięciem)
  [srv-circle]   ← strzałka →, obrót 45° gdy otwarta
[srv-divider]
[service-row]
...
[srv-divider]  ← zamknięcie listy
```

**Grid desktop:** `grid-template-columns: 600px 1fr 48px`, `gap: 4rem`, `padding: 3.25rem 0`

**Grid tablet/mobile** (≤1200px): `grid-template-columns: 1fr 48px`, obszary `"title circle" / "desc desc"`.
- `srv-desc` domyślnie zwinięty (`max-height:0`), kliknięcie `srv-circle` toggle `.open`
- `srv-circle` obraca się 45° w stanie otwartym

**Tablet padding:** `padding: 2.25rem 0`. **Expanded desc padding:** `padding-top: 1.5rem; padding-bottom: 2.25rem`.

---

## 7. Czego nie robimy

Z `brand.md` i z decyzji podjętych w wireframe:

- **Żadnych stockowych zdjęć** uśmiechniętych prawników w garniturach przy biurku
- **Żadnych złotych orłów, wag ani kolumn** — żadnej symboliki „kancelaria"
- **Żadnych gradientów** — tła płaskie, bez linear-gradient między kolorami
- **Żadnego przepełnienia treścią** — white space jest częścią projektu
- **Żadnych box-shadow na kartach** — separacja wyłącznie przez border
- **Żadnych ikon z fill** — ikonki line-only, stroke-width 1.5px
- **Żadnego tekstu all-caps poza micro-labels** — nagłówki i body zawsze sentence case
- **Żadnych ciepłych beży i złota** kojarzących się z „renomowaną kancelarią"
- **Żadnych słów zakazanych** z brand.md: „renomowana", „najwyższe standardy", „zaufany partner", „kompleksowa obsługa"

---

## 8. Animacje

*(Sekcja pusta — wypełnimy w kolejnej lekcji.)*
