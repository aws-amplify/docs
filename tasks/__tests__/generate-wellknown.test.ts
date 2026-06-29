import { generateApiCatalog } from '../generate-wellknown.mjs';

describe('generate-wellknown', () => {
  describe('generateApiCatalog', () => {
    it('should return a valid linkset JSON document', () => {
      const result = generateApiCatalog('https://docs.amplify.aws');
      const parsed = JSON.parse(result);

      expect(Array.isArray(parsed.linkset)).toBe(true);
      expect(parsed.linkset).toHaveLength(1);
    });

    it('should anchor the catalog to the site root', () => {
      const parsed = JSON.parse(generateApiCatalog('https://docs.amplify.aws'));

      expect(parsed.linkset[0].anchor).toBe('https://docs.amplify.aws/');
    });

    it('should advertise the llms.txt resources as service-doc links', () => {
      const parsed = JSON.parse(generateApiCatalog('https://docs.amplify.aws'));
      const hrefs = parsed.linkset[0]['service-doc'].map((l: any) => l.href);

      expect(hrefs).toContain('https://docs.amplify.aws/ai/llms.txt');
      expect(hrefs).toContain('https://docs.amplify.aws/ai/llms-full.txt');
    });

    it('should advertise the sitemap as a related link', () => {
      const parsed = JSON.parse(generateApiCatalog('https://docs.amplify.aws'));
      const hrefs = parsed.linkset[0].related.map((l: any) => l.href);

      expect(hrefs).toContain('https://docs.amplify.aws/sitemap.xml');
    });

    it('should honor the provided domain', () => {
      const parsed = JSON.parse(generateApiCatalog('https://example.com'));

      expect(parsed.linkset[0].anchor).toBe('https://example.com/');
    });
  });
});
