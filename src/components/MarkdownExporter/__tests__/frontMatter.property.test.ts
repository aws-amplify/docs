/**
 * Feature: amplify-docs-restructuring, Property 11: Markdown front matter completeness
 *
 * For any page metadata with title, description, section, and lastUpdated fields,
 * the generateFrontMatter function should produce YAML front matter containing
 * all four fields with their correct values.
 */
import fc from 'fast-check';
import { generateFrontMatter, PageMeta } from '../frontMatter';

describe('Property 11: Markdown front matter completeness', () => {
  const pageMeta = fc.record({
    title: fc.string({ minLength: 1, maxLength: 120 }),
    description: fc.string({ minLength: 1, maxLength: 300 }),
    section: fc.constantFrom(
      'frontend',
      'backend',
      'hosting',
      'configure',
      'legacy'
    ),
    lastUpdated: fc
      .integer({
        min: new Date('2000-01-01').getTime(),
        max: new Date('2030-12-31').getTime()
      })
      .map((ts) => new Date(ts).toISOString())
  });

  it('should always start and end with --- delimiters', () => {
    fc.assert(
      fc.property(pageMeta, (meta: PageMeta) => {
        const result = generateFrontMatter(meta);
        const lines = result.split('\n');
        expect(lines[0]).toBe('---');
        expect(lines[lines.length - 1]).toBe('---');
      }),
      { numRuns: 100 }
    );
  });

  it('should always contain all four metadata fields', () => {
    fc.assert(
      fc.property(pageMeta, (meta: PageMeta) => {
        const result = generateFrontMatter(meta);
        expect(result).toContain('title:');
        expect(result).toContain('description:');
        expect(result).toContain('section:');
        expect(result).toContain('lastUpdated:');
      }),
      { numRuns: 100 }
    );
  });

  it('should produce exactly 6 lines (--- / title / description / section / lastUpdated / ---)', () => {
    fc.assert(
      fc.property(pageMeta, (meta: PageMeta) => {
        const result = generateFrontMatter(meta);
        const lines = result.split('\n');
        expect(lines).toHaveLength(6);
      }),
      { numRuns: 100 }
    );
  });

  it('should preserve field values (unquoted values appear verbatim, quoted values are recoverable)', () => {
    fc.assert(
      fc.property(pageMeta, (meta: PageMeta) => {
        const result = generateFrontMatter(meta);

        // Each field value must appear somewhere in the output.
        // Values that need YAML escaping are wrapped in double quotes,
        // so we check the raw value or the escaped version.
        for (const key of [
          'title',
          'description',
          'section',
          'lastUpdated'
        ] as const) {
          const value = meta[key];
          // The value should appear in the line for this key
          const line = result.split('\n').find((l) => l.startsWith(`${key}:`));
          expect(line).toBeDefined();

          // Extract the value portion after "key: "
          const lineValue = line!.substring(key.length + 2);

          if (lineValue.startsWith('"') && lineValue.endsWith('"')) {
            // Quoted — unescape and compare
            const unescaped = lineValue
              .slice(1, -1)
              .replace(/\\"/g, '"')
              .replace(/\\\\/g, '\\');
            expect(unescaped).toBe(value);
          } else {
            // Unquoted — direct match
            expect(lineValue).toBe(value);
          }
        }
      }),
      { numRuns: 100 }
    );
  });
});
