# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Co to jest ten projekt

Repozytorium planistyczne dla nowej strony internetowej kancelarii **BLSK Legal** (BLSK KOZŁOWSKI I WSPÓLNICY SP. K.). Nie ma tu jeszcze kodu — są dokumenty projektowe, które definiują zakres i kierunek budowy strony.

Obecna strona klienta: https://blsklegal.com/

## Pliki projektowe

- `context/brief.md` — kompletny brief projektu: cele, zakres, struktura podstron, inspiracje, ryzyka. Czytaj go jako pierwsze źródło prawdy o projekcie.
- `context/brand.md` — fundament marki: misja, wizja, positioning, archetyp, osobowość (MBTI + 12 osi), głos i ton, słowa zakazane, kierunek wizualny.
- `assets/` — tu trafią materiały graficzne (logo, zdjęcia).

## Stack technologiczny

**Etap 1:** Statyczny HTML/CSS/JS budowany przez Claude Code.
**Etap 2 (docelowo):** Astro + Keystatic CMS.

Ograniczenia: wyłącznie bezpłatne narzędzia. Bez WordPressa, bez Webflow.

## Kluczowe wymagania techniczne

- Core Web Vitals i szybkość ładowania są priorytetem — każda decyzja techniczna musi to uwzględniać.
- Trzy widoki: Desktop, Tablet, Mobile.
- Dwie wersje językowe: PL i EN — każda strona, artykuł i profil musi istnieć w obu językach.
- Identyfikacja wizualna: przenosimy z obecnej strony (kolory, czcionki z blsklegal.com).

## Zakres strony

29 profili prawników (każdy z rozbudowaną strukturą: akordeony, doświadczenie, wyróżnienia, publikacje), 5 podstron praktyk, ~48 artykułów Aktualności, ~14 odcinków Corpo Snap, FAQ, Kontakt. Łącznie ~100 podstron × 2 języki.

Szczegółowy zakres i struktura każdej podstrony: `context/brief.md`.
