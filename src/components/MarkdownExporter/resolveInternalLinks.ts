/**
 * Regex that matches Markdown links: [text](url)
 * Captures: full match, link text, and URL.
 */
const MARKDOWN_LINK_REGEX = /\[([^\]]*)\]\(([^)]+)\)/g;

/**
 * Check whether a URL is an external link (starts with http:// or https://).
 */
function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

/**
 * Check whether a URL is an internal relative path (starts with `/`).
 */
function isInternalPath(url: string): boolean {
  return url.startsWith('/');
}

/**
 * Convert internal relative links in a Markdown string to absolute URLs.
 *
 * Internal links (paths starting with `/`) are prefixed with the base URL.
 * External URLs (starting with `http://` or `https://`) are left unchanged.
 * Other link formats (anchors, relative paths without leading `/`, mailto, etc.)
 * are also left unchanged.
 *
 * @param markdown - The Markdown string containing links
 * @param baseUrl - The base domain URL (e.g. `https://docs.amplify.aws`)
 * @returns The Markdown string with internal links resolved to absolute URLs
 */
export function resolveInternalLinks(
  markdown: string,
  baseUrl: string
): string {
  // Strip trailing slash from baseUrl to avoid double slashes
  const normalizedBase = baseUrl.replace(/\/+$/, '');

  return markdown.replace(MARKDOWN_LINK_REGEX, (match, text, url) => {
    if (isExternalUrl(url)) {
      return match;
    }

    if (isInternalPath(url)) {
      return `[${text}](${normalizedBase}${url})`;
    }

    // Leave other link types unchanged (anchors, relative, mailto, etc.)
    return match;
  });
}
