// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { loadEnv } from "vite";
const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_STUDIO_URL,
} = loadEnv(import.meta.env.MODE, process.cwd(), "");
import { defineConfig } from "astro/config";

// Identyfikator projektu i dataset nie są tajne (trafiają do przeglądarki w adresach obrazów),
// więc mają wartości domyślne — build działa bez ustawiania zmiennych na hostingu.
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || "oxgkyhdv";
const dataset = PUBLIC_SANITY_STUDIO_DATASET || "production";
const studioUrl = PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333";

import sanity from "@sanity/astro";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Strona generowana statycznie w czasie builda (najlepsze Core Web Vitals).
  // Po publikacji treści w Sanity trzeba przebudować stronę (webhook przy wdrożeniu).
  output: "static",
  site: "https://legal-projekt.vercel.app",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [
    sanity({
      projectId,
      dataset,
      useCdn: false,
      apiVersion: "2026-03-26",
      stega: {
        studioUrl,
      },
    }),
    react(), // Wymagane przez komponent VisualEditing
    // Mapa strony dla wyszukiwarek (sitemap-index.xml), bez strony 404
    sitemap({ filter: (page) => !page.includes("/404") }),
  ],
  vite: {
    optimizeDeps: {
      include: [
        "react/compiler-runtime",
        "lodash/isObject.js",
        "lodash/groupBy.js",
        "lodash/keyBy.js",
        "lodash/partition.js",
        "lodash/sortedIndex.js",
      ],
    },
  },
});
