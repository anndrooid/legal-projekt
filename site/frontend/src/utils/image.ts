import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "sanity:client";

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format");
}

/**
 * Responsywny srcset z CDN Sanity (webp/avif automatycznie).
 * Szerokości rosnąco.
 */
export function buildSrcSet(source: SanityImageSource, widths: number[], quality = 80): string {
  return widths
    .map((w) => `${builder.image(source).width(w).auto("format").quality(quality).url()} ${w}w`)
    .join(", ");
}

type Hotspot = { x: number; y: number };
type Crop = { top: number; bottom: number; left: number; right: number };

/**
 * object-position / background-position z punktu centralnego (hotspot) ustawionego w Studio.
 * URL z Sanity jest już przycięty do prostokąta „crop”, więc hotspot przeliczamy względem przyciętego obszaru.
 */
export function objectPosition(image?: { hotspot?: Hotspot; crop?: Crop }, fallback = "50% 15%") {
  const h = image?.hotspot;
  if (!h) return fallback;
  const c = image?.crop ?? { top: 0, bottom: 0, left: 0, right: 0 };
  const rel = (v: number, a: number, b: number) => {
    const size = 1 - a - b;
    return size > 0 ? Math.min(1, Math.max(0, (v - a) / size)) : 0.5;
  };
  const x = rel(h.x, c.left, c.right);
  const y = rel(h.y, c.top, c.bottom);
  return `${Math.round(x * 100)}% ${Math.round(y * 100)}%`;
}

/** background-image dla kart w stylu makiet (div z tłem) */
export function bgStyle(image: SanityImageSource & { hotspot?: Hotspot; crop?: Crop }, width: number) {
  const url = builder.image(image).width(width).auto("format").quality(80).url();
  const pos = objectPosition(image, "center");
  return `background-image:url('${url}');background-size:cover;background-position:${pos}`;
}
