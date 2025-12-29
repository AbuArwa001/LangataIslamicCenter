export function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  if (typeof window === "undefined") {
    // Server-side: simple regex to strip tags
    return html.replace(/<[^>]*>?/gm, "");
  }
  // Client-side: use DOMParser
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export function isHtml(str: string): boolean {
  return str.startsWith("<") || /<[a-z][\s\S]*>/i.test(str);
}
