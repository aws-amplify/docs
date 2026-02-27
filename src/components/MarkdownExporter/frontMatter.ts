/**
 * Metadata for a documentation page, used to generate YAML front matter.
 */
export interface PageMeta {
  title: string;
  description: string;
  section: string;
  lastUpdated: string;
}

/**
 * Escape a YAML string value by wrapping it in double quotes if it contains
 * characters that could break YAML parsing (colons, quotes, newlines, etc.).
 */
function escapeYamlValue(value: string): string {
  if (
    value.includes(':') ||
    value.includes('#') ||
    value.includes('"') ||
    value.includes("'") ||
    value.includes('\n') ||
    value.startsWith(' ') ||
    value.endsWith(' ')
  ) {
    // Escape internal double quotes and wrap in double quotes
    const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return `"${escaped}"`;
  }
  return value;
}

/**
 * Generate YAML front matter from page metadata.
 *
 * Produces a string with `---` delimiters containing title, description,
 * section, and lastUpdated fields.
 *
 * @param meta - Page metadata object
 * @returns YAML front matter string with `---` delimiters
 */
export function generateFrontMatter(meta: PageMeta): string {
  const lines = [
    '---',
    `title: ${escapeYamlValue(meta.title)}`,
    `description: ${escapeYamlValue(meta.description)}`,
    `section: ${escapeYamlValue(meta.section)}`,
    `lastUpdated: ${escapeYamlValue(meta.lastUpdated)}`,
    '---'
  ];
  return lines.join('\n');
}
