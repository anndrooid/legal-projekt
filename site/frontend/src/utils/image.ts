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

/** object-position z punktu centralnego (hotspot) ustawionego w Studio */
export function objectPosition(image?: { hotspot?: { x: number; y: number } }) {
  const h = image?.hotspot;
  return h ? `${Math.round(h.x * 100)}% ${Math.round(h.y * 100)}%` : "50% 15%";
}

/** background-image dla kart w stylu makiet (div z tłem) */
export function bgStyle(image: SanityImageSource & { hotspot?: { x: number; y: number } }, width: number) {
  const url = builder.image(image).width(width).auto("format").quality(80).url();
  const pos = image.hotspot ? objectPosition(image) : "center";
  return `background-image:url('${url}');background-size:cover;background-position:${pos}`;
}
