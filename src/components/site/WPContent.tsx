/**
 * Renders sanitized HTML from WordPress.
 *
 * WordPress.com's API returns trusted HTML for the site owner's published
 * content. We strip a small set of dangerous tags (script, iframe, style)
 * and on* attributes as a defense-in-depth measure.
 */
function sanitize(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    // Strip the [field key="..."]value[/field] shortcodes used for custom fields
    // so they don't leak into rendered prose.
    .replace(/\[field\s+key=["'][^"']+["']\][\s\S]*?\[\/field\]/gi, "");
}

export function WPContent({
  html,
  className = "prose prose-neutral max-w-none",
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitize(html) }}
    />
  );
}
