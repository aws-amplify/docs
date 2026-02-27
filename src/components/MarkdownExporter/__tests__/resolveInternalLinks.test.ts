import { resolveInternalLinks } from '../resolveInternalLinks';

const BASE_URL = 'https://docs.amplify.aws';

describe('resolveInternalLinks', () => {
  describe('internal links', () => {
    it('should convert internal relative links to absolute URLs', () => {
      const md = 'See [Auth Setup](/auth/setup) for details.';
      const result = resolveInternalLinks(md, BASE_URL);

      expect(result).toBe(
        'See [Auth Setup](https://docs.amplify.aws/auth/setup) for details.'
      );
    });

    it('should convert multiple internal links', () => {
      const md = 'See [Auth](/auth) and [Data](/data) and [Storage](/storage).';
      const result = resolveInternalLinks(md, BASE_URL);

      expect(result).toContain('(https://docs.amplify.aws/auth)');
      expect(result).toContain('(https://docs.amplify.aws/data)');
      expect(result).toContain('(https://docs.amplify.aws/storage)');
    });

    it('should preserve anchor fragments on internal links', () => {
      const md = 'See [Setup](/auth/setup#prerequisites) for details.';
      const result = resolveInternalLinks(md, BASE_URL);

      expect(result).toBe(
        'See [Setup](https://docs.amplify.aws/auth/setup#prerequisites) for details.'
      );
    });

    it('should preserve query parameters on internal links', () => {
      const md = 'See [Docs](/auth/setup?framework=react) for details.';
      const result = resolveInternalLinks(md, BASE_URL);

      expect(result).toBe(
        'See [Docs](https://docs.amplify.aws/auth/setup?framework=react) for details.'
      );
    });
  });

  describe('external links', () => {
    it('should leave https external links unchanged', () => {
      const md = 'Visit [GitHub](https://github.com/aws-amplify).';
      const result = resolveInternalLinks(md, BASE_URL);

      expect(result).toBe('Visit [GitHub](https://github.com/aws-amplify).');
    });

    it('should leave http external links unchanged', () => {
      const md = 'Visit [Example](http://example.com).';
      const result = resolveInternalLinks(md, BASE_URL);

      expect(result).toBe('Visit [Example](http://example.com).');
    });
  });

  describe('mixed links', () => {
    it('should resolve internal and leave external links unchanged', () => {
      const md = 'See [Auth](/auth) and [GitHub](https://github.com) for more.';
      const result = resolveInternalLinks(md, BASE_URL);

      expect(result).toContain('(https://docs.amplify.aws/auth)');
      expect(result).toContain('(https://github.com)');
    });
  });

  describe('other link types', () => {
    it('should leave anchor-only links unchanged', () => {
      const md = 'Jump to [Prerequisites](#prerequisites).';
      const result = resolveInternalLinks(md, BASE_URL);

      expect(result).toBe('Jump to [Prerequisites](#prerequisites).');
    });

    it('should leave relative links without leading slash unchanged', () => {
      const md = 'See [sibling](sibling-page) for details.';
      const result = resolveInternalLinks(md, BASE_URL);

      expect(result).toBe('See [sibling](sibling-page) for details.');
    });

    it('should leave mailto links unchanged', () => {
      const md = 'Contact [us](mailto:support@example.com).';
      const result = resolveInternalLinks(md, BASE_URL);

      expect(result).toBe('Contact [us](mailto:support@example.com).');
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      const result = resolveInternalLinks('', BASE_URL);
      expect(result).toBe('');
    });

    it('should handle markdown with no links', () => {
      const md = '# Title\n\nSome text without links.';
      const result = resolveInternalLinks(md, BASE_URL);

      expect(result).toBe(md);
    });

    it('should handle base URL with trailing slash', () => {
      const md = 'See [Auth](/auth/setup).';
      const result = resolveInternalLinks(md, 'https://docs.amplify.aws/');

      expect(result).toBe('See [Auth](https://docs.amplify.aws/auth/setup).');
    });

    it('should handle link text with special characters', () => {
      const md = 'See [Auth & Data (v2)](/auth/setup).';
      const result = resolveInternalLinks(md, BASE_URL);

      expect(result).toBe(
        'See [Auth & Data (v2)](https://docs.amplify.aws/auth/setup).'
      );
    });

    it('should handle root path link', () => {
      const md = 'Go to [Home](/).';
      const result = resolveInternalLinks(md, BASE_URL);

      expect(result).toBe('Go to [Home](https://docs.amplify.aws/).');
    });
  });
});
