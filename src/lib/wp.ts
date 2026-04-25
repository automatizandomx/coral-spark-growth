/**
 * WordPress.com headless client.
 *
 * Uses the public REST API v1.1 (no auth required for published content).
 * Site: inmueblescoral.wordpress.com
 *
 * Docs: https://developer.wordpress.com/docs/api/
 */

const WP_SITE = "inmueblescoral.wordpress.com";
const WP_BASE = `https://public-api.wordpress.com/rest/v1.1/sites/${WP_SITE}`;

// Cache fetches per server render to avoid duplicate calls within the same loader pass.
const REVALIDATE_SECONDS = 60;

export type WPPage = {
  ID: number;
  title: string;
  slug: string;
  content: string; // HTML
  excerpt: string; // HTML
  featured_image: string | null;
  modified: string;
  metadata?: Array<{ key: string; value: string }>;
};

export type WPPost = WPPage & {
  date: string;
  author: { name: string; avatar_URL: string };
  categories: Record<string, { name: string; slug: string }>;
  tags: Record<string, { name: string; slug: string }>;
};

type WPRawPost = {
  ID: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  featured_image?: string;
  author?: { name: string; avatar_URL: string };
  categories?: Record<string, { name: string; slug: string }>;
  tags?: Record<string, { name: string; slug: string }>;
  metadata?: Array<{ key: string; value: string }>;
};

async function wpFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${WP_BASE}${path}`, {
      headers: { Accept: "application/json" },
      // SSR-friendly cache hint (Cloudflare Workers / browsers ignore unknown init keys)
      // @ts-expect-error - next-style revalidate, harmless elsewhere
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) {
      if (res.status !== 404) {
        console.warn(`[wp] ${path} → ${res.status}`);
      }
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[wp] fetch failed for ${path}:`, err);
    return null;
  }
}

function normalizePost(raw: WPRawPost): WPPost {
  return {
    ID: raw.ID,
    title: stripHtml(raw.title),
    slug: raw.slug,
    content: raw.content ?? "",
    excerpt: raw.excerpt ?? "",
    featured_image: raw.featured_image || null,
    date: raw.date,
    modified: raw.modified,
    author: raw.author ?? { name: "", avatar_URL: "" },
    categories: raw.categories ?? {},
    tags: raw.tags ?? {},
    metadata: raw.metadata,
  };
}

function stripHtml(s: string): string {
  return s
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .trim();
}

/**
 * Get a WordPress PAGE by its slug.
 * Use for static editable blocks (hero copy, about, contact info, etc.).
 */
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const raw = await wpFetch<WPRawPost>(`/posts/slug:${slug}?type=page`);
  return raw ? normalizePost(raw) : null;
}

/**
 * Get a WordPress POST by its slug. Use for blog detail pages.
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const raw = await wpFetch<WPRawPost>(`/posts/slug:${slug}`);
  return raw ? normalizePost(raw) : null;
}

/**
 * List posts in a given category (by category slug).
 */
export async function getPostsByCategory(
  categorySlug: string,
  number = 20,
): Promise<WPPost[]> {
  const data = await wpFetch<{ posts: WPRawPost[] }>(
    `/posts?category=${encodeURIComponent(categorySlug)}&number=${number}`,
  );
  if (!data?.posts) return [];
  return data.posts.map(normalizePost);
}

/**
 * List posts EXCLUDING a given category (used for /blog to filter out
 * "desarrollos" content posts).
 */
export async function getBlogPosts(
  excludeCategory = "desarrollos",
  number = 20,
): Promise<WPPost[]> {
  const data = await wpFetch<{ posts: WPRawPost[] }>(
    `/posts?number=${number}`,
  );
  if (!data?.posts) return [];
  return data.posts
    .map(normalizePost)
    .filter((p) => !p.categories[excludeCategory]);
}

/**
 * Read a custom field value from a page/post `metadata` array.
 *
 * On WordPress.com Personal/Free plans, custom fields are NOT exposed in the
 * default API response unless the user enables the "Custom Fields" screen and
 * adds them via the post editor. As a fallback we also parse simple shortcodes
 * from the post content like `[field key="price"]$249,000[/field]`.
 */
export function getMeta(
  source: WPPage | WPPost | null,
  key: string,
): string | null {
  if (!source) return null;
  const meta = source.metadata?.find((m) => m.key === key);
  if (meta?.value) return meta.value;

  // Fallback: parse shortcode-style fields from the content.
  // Format: [field key="price"]$249,000[/field]
  const re = new RegExp(
    `\\[field\\s+key=["']${escapeRegex(key)}["']\\]([\\s\\S]*?)\\[\\/field\\]`,
    "i",
  );
  const match = source.content.match(re);
  if (match) return stripHtml(match[1]).trim();
  return null;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Helper: get a meta value with fallback to a default string.
 */
export function metaOr(
  source: WPPage | WPPost | null,
  key: string,
  fallback: string,
): string {
  return getMeta(source, key) ?? fallback;
}

/**
 * Helper: get the page content (HTML) with a fallback.
 */
export function contentOr(source: WPPage | WPPost | null, fallback: string): string {
  return source?.content?.trim() ? source.content : fallback;
}

/**
 * Helper: get the page title with a fallback.
 */
export function titleOr(source: WPPage | WPPost | null, fallback: string): string {
  return source?.title?.trim() ? source.title : fallback;
}

/**
 * Helper: format an ISO date as a Spanish month-day-year.
 */
export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}
