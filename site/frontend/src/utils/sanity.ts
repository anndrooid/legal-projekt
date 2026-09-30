import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { Slug } from "@sanity/types";
import groq from "groq";

const visualEditingEnabled = import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === "true";
const token = import.meta.env.SANITY_API_READ_TOKEN;

// visualEditingEnabled=true: szkice z kodowaniem stega (lokalnie z narzędziem Presentation)
// visualEditingEnabled=false: opublikowane treści (build produkcyjny, bez CDN — zawsze najświeższe)
async function loadQuery<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    perspective: visualEditingEnabled ? "drafts" : "published",
    useCdn: false,
    ...(visualEditingEnabled && token ? { token, stega: true } : {}),
  });
}

// Wspólna projekcja obrazu — wymiary i LQIP z metadanych assetu
const imageProjection = `{
  ...,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip,
}`;

const personCard = `
  _id, name, slug, role, tier, specialization, practices, leadsPractices,
  photo ${imageProjection}
`;

const articleCard = `
  _id, title, slug, publishedAt, category, excerpt, featured, source,
  cover ${imageProjection}
`;

// ---------------------------------------------------------------- ZESPÓŁ

export function getPeople(): Promise<PersonCard[]> {
  return loadQuery(
    groq`*[_type == "person" && defined(slug.current)] | order(order asc, name asc) { ${personCard} }`,
  );
}

export function getPerson(slug: string): Promise<Person | null> {
  return loadQuery(
    groq`*[_type == "person" && slug.current == $slug][0] {
      ...,
      photo ${imageProjection},
      publications[] { ..., cover ${imageProjection} }
    }`,
    { slug },
  );
}

// ---------------------------------------------------------------- AKTUALNOŚCI

export function getArticles(): Promise<ArticleCard[]> {
  return loadQuery(
    groq`*[_type == "article" && defined(slug.current)] | order(publishedAt desc) { ${articleCard} }`,
  );
}

export function getArticle(slug: string): Promise<Article | null> {
  return loadQuery(
    groq`*[_type == "article" && slug.current == $slug][0] {
      ...,
      cover ${imageProjection},
      body[] { ..., _type == "image" => ${imageProjection} },
      people[] { note, person-> { ${personCard} } },
      seo { ..., ogImage ${imageProjection} }
    }`,
    { slug },
  );
}

// ---------------------------------------------------------------- TYPY

export interface SanityImage {
  _type: "image";
  asset?: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
  caption?: string;
  width: number;
  height: number;
  lqip?: string;
}

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
}

export type Tier = "partner" | "counsel" | "associate" | "support";

export interface PersonCard {
  _id: string;
  name: string;
  slug: Slug;
  role: string;
  tier: Tier;
  specialization?: string;
  practices?: string[];
  leadsPractices?: string[];
  photo?: SanityImage;
}

export interface Person extends PersonCard {
  tags?: string[];
  lead?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  bioHeading?: string;
  bio?: PortableTextBlock[];
  experience?: string[];
  awards?: { _key: string; text: string; years?: string }[];
  otherActivities?: string[];
  education?: { _key: string; degree: string; institution?: string; note?: string; year?: string }[];
  languages?: { _key: string; name: string; level?: string; dots?: number }[];
  publications?: { _key: string; cover?: SanityImage; tag?: string; title: string; meta?: string }[];
}

export interface ArticleCard {
  _id: string;
  title: string;
  slug: Slug;
  publishedAt: string;
  category: string;
  excerpt: string;
  featured?: boolean;
  source?: string;
  cover?: SanityImage;
}

export interface Article extends ArticleCard {
  body?: PortableTextBlock[];
  people?: { note?: string; person: PersonCard | null }[];
  practice?: string;
  tags?: string[];
  seo?: Seo;
}
