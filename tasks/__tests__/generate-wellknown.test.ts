import {
  generateApiCatalog,
  generateMcpServerCard
} from '../generate-wellknown.mjs';

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

    it('should advertise the full export as a service-desc link (RFC 9727)', () => {
      const parsed = JSON.parse(generateApiCatalog('https://docs.amplify.aws'));
      const entry = parsed.linkset[0];

      expect(Array.isArray(entry['service-desc'])).toBe(true);
      const hrefs = entry['service-desc'].map((l: any) => l.href);
      expect(hrefs).toContain('https://docs.amplify.aws/ai/llms-full.txt');
    });

    it('should advertise the llms.txt index as a service-doc link', () => {
      const parsed = JSON.parse(generateApiCatalog('https://docs.amplify.aws'));
      const hrefs = parsed.linkset[0]['service-doc'].map((l: any) => l.href);

      expect(hrefs).toContain('https://docs.amplify.aws/ai/llms.txt');
    });

    it('should advertise the sitemap as a service-meta link', () => {
      const parsed = JSON.parse(generateApiCatalog('https://docs.amplify.aws'));
      const hrefs = parsed.linkset[0]['service-meta'].map((l: any) => l.href);

      expect(hrefs).toContain('https://docs.amplify.aws/sitemap.xml');
    });

    it('should represent each relation as an array of href/type objects', () => {
      const parsed = JSON.parse(generateApiCatalog('https://docs.amplify.aws'));
      const entry = parsed.linkset[0];

      for (const rel of ['service-desc', 'service-doc', 'service-meta']) {
        for (const link of entry[rel]) {
          expect(typeof link.href).toBe('string');
          expect(typeof link.type).toBe('string');
        }
      }
    });

    it('should honor the provided domain', () => {
      const parsed = JSON.parse(generateApiCatalog('https://example.com'));

      expect(parsed.linkset[0].anchor).toBe('https://example.com/');
    });
  });

  describe('generateMcpServerCard', () => {
    it('should return a valid server card JSON document', () => {
      const parsed = JSON.parse(generateMcpServerCard());

      expect(parsed.serverInfo).toBeDefined();
      expect(parsed.serverInfo.name).toBe('aws-knowledge-mcp-server');
    });

    it('should point at the public AWS Knowledge MCP endpoint over HTTP', () => {
      const parsed = JSON.parse(generateMcpServerCard());

      expect(parsed.transport.type).toBe('http');
      expect(parsed.transport.endpoint).toBe(
        'https://knowledge-mcp.global.api.aws'
      );
    });

    it('should declare that no authentication is required', () => {
      const parsed = JSON.parse(generateMcpServerCard());

      expect(parsed.authentication.required).toBe(false);
    });

    it('should advertise the documentation and skill tools', () => {
      const parsed = JSON.parse(generateMcpServerCard());

      expect(parsed.capabilities.tools).toEqual(
        expect.arrayContaining([
          'search_documentation',
          'read_documentation',
          'retrieve_skill'
        ])
      );
    });
  });
});
