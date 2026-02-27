/**
 * Feature: amplify-docs-restructuring, Property 12: Internal link resolution to absolute URLs
 *
 * For any Markdown string containing internal relative links (paths starting with `/`),
 * the resolveInternalLinks function should convert every internal link to an absolute URL
 * using the docs.amplify.aws base domain, while leaving external URLs unchanged.
 */
import fc from 'fast-check';
import { resolveInternalLinks } from '../resolveInternalLinks';

const BASE_URL = 'https://docs.amplify.aws';

/** Arbitrary for a path segment like "auth", "setup", "getting-started" */
const pathSegment = fc.stringMatching(/^[a-z][a-z0-9-]{0,14}$/);

/** Arbitrary for an internal path like /auth/setup */
const internalPath = fc
  .array(pathSegment, { minLength: 1, maxLength: 4 })
  .map((segments) => '/' + segments.join('/'));

/** Arbitrary for an external URL */
const externalUrl = fc
  .tuple(
    fc.constantFrom(
      'https://github.com',
      'https://example.com',
      'http://legacy.site.com'
    ),
    internalPath
  )
  .map(([domain, path]) => domain + path);

/** Arbitrary for link text (no brackets or parens) */
const linkText = fc.stringMatching(/^[A-Za-z][A-Za-z0-9 ]{0,24}$/);

/** Build a Markdown link */
function mdLink(text: string, url: string): string {
  return `[${text}](${url})`;
}

describe('Property 12: Internal link resolution to absolute URLs', () => {
  it('should convert all internal links to absolute URLs', () => {
    fc.assert(
      fc.property(
        fc.array(fc.tuple(linkText, internalPath), {
          minLength: 1,
          maxLength: 5
        }),
        (links) => {
          const md = links
            .map(([text, path]) => mdLink(text, path))
            .join(' and ');
          const result = resolveInternalLinks(md, BASE_URL);

          for (const [, path] of links) {
            expect(result).toContain(`(${BASE_URL}${path})`);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should leave all external links unchanged', () => {
    fc.assert(
      fc.property(
        fc.array(fc.tuple(linkText, externalUrl), {
          minLength: 1,
          maxLength: 5
        }),
        (links) => {
          const md = links.map(([text, url]) => mdLink(text, url)).join(' ');
          const result = resolveInternalLinks(md, BASE_URL);

          for (const [text, url] of links) {
            expect(result).toContain(mdLink(text, url));
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should resolve internal and preserve external in mixed content', () => {
    fc.assert(
      fc.property(
        fc.tuple(linkText, internalPath),
        fc.tuple(linkText, externalUrl),
        (internal, external) => {
          const md = `See ${mdLink(internal[0], internal[1])} and ${mdLink(external[0], external[1])}.`;
          const result = resolveInternalLinks(md, BASE_URL);

          expect(result).toContain(`(${BASE_URL}${internal[1]})`);
          expect(result).toContain(mdLink(external[0], external[1]));
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should produce identical output with or without trailing slash on base URL', () => {
    fc.assert(
      fc.property(fc.tuple(linkText, internalPath), (link) => {
        const md = mdLink(link[0], link[1]);
        const withSlash = resolveInternalLinks(md, BASE_URL + '/');
        const withoutSlash = resolveInternalLinks(md, BASE_URL);

        expect(withSlash).toBe(withoutSlash);
      }),
      { numRuns: 100 }
    );
  });

  it('should leave anchor-only links unchanged', () => {
    fc.assert(
      fc.property(linkText, pathSegment, (text, anchor) => {
        const url = `#${anchor}`;
        const md = mdLink(text, url);
        const result = resolveInternalLinks(md, BASE_URL);

        expect(result).toBe(md);
      }),
      { numRuns: 100 }
    );
  });
});
