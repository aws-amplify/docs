import {
  collectGen2Pages,
  transformMdxToMarkdown,
  generateFrontmatter,
  generateLlmsIndex
} from '../generate-llms-txt.mjs';

describe('generate-llms-txt', () => {
  describe('collectGen2Pages', () => {
    it('should return only Gen2 pages', () => {
      const mockDirectory = {
        path: 'src/pages/[platform]/index.tsx',
        children: [
          {
            path: 'src/pages/[platform]/build-a-backend/auth/set-up-auth/index.mdx',
            title: 'Set up Amplify Auth',
            description: 'Learn how to set up auth.',
            platforms: ['react', 'nextjs'],
            lastUpdated: '2025-01-15T00:00:00.000Z',
            route: '/[platform]/build-a-backend/auth/set-up-auth'
          },
          {
            path: 'src/pages/gen1/[platform]/start/index.mdx',
            title: 'Gen1 Start',
            description: 'Gen1 getting started.',
            platforms: ['react'],
            route: '/gen1/[platform]/start'
          }
        ]
      };

      const pages = collectGen2Pages(mockDirectory);
      expect(pages.length).toBe(1);
      expect(pages[0].title).toBe('Set up Amplify Auth');
    });

    it('should skip external links', () => {
      const mockDirectory = {
        path: 'src/pages/[platform]/index.tsx',
        children: [
          {
            path: 'src/pages/[platform]/build-a-backend/auth/index.mdx',
            title: 'Auth',
            route: '/[platform]/build-a-backend/auth',
            platforms: ['react'],
            isExternal: true
          }
        ]
      };

      const pages = collectGen2Pages(mockDirectory);
      expect(pages.length).toBe(0);
    });

    it('should extract correct section from route', () => {
      const mockDirectory = {
        path: 'src/pages/[platform]/index.tsx',
        children: [
          {
            path: 'src/pages/[platform]/build-a-backend/auth/set-up-auth/index.mdx',
            title: 'Set up Auth',
            description: '',
            platforms: ['react'],
            route: '/[platform]/build-a-backend/auth/set-up-auth',
            lastUpdated: ''
          }
        ]
      };

      const pages = collectGen2Pages(mockDirectory);
      expect(pages[0].section).toBe('build-a-backend/auth');
    });
  });

  describe('transformMdxToMarkdown', () => {
    it('should strip exports and imports', () => {
      const input = `import { getCustomStaticPath } from '@/utils/getCustomStaticPath';

export const meta = {
  title: 'Test',
  description: 'test page',
  platforms: ['react']
};

export function getStaticPaths() {
  return getCustomStaticPath(meta.platforms);
};

export function getStaticProps() {
  return {
    props: {
      meta
    }
  };
};

# Hello World

Some content here.`;

      const result = transformMdxToMarkdown(input);
      expect(result).not.toContain('export const meta');
      expect(result).not.toContain('import');
      expect(result).not.toContain('getStaticPaths');
      expect(result).not.toContain('getStaticProps');
      expect(result).toContain('# Hello World');
      expect(result).toContain('Some content here.');
    });

    it('should convert InlineFilter to HTML comments', () => {
      const input = `<InlineFilter filters={["react"]}>React only content</InlineFilter>`;
      const result = transformMdxToMarkdown(input);
      expect(result).toContain('<!-- Platform: react -->');
      expect(result).toContain('React only content');
      expect(result).toContain('<!-- /Platform -->');
    });

    it('should convert Callout info', () => {
      const input = `<Callout info>This is important info.</Callout>`;
      const result = transformMdxToMarkdown(input);
      expect(result).toContain('> **Info:** This is important info.');
    });

    it('should convert Callout warning', () => {
      const input = `<Callout warning>Be careful!</Callout>`;
      const result = transformMdxToMarkdown(input);
      expect(result).toContain('> **Warning:** Be careful!');
    });

    it('should convert BlockSwitcher/Block to headings', () => {
      const input = `<BlockSwitcher>
<Block name="TypeScript">
TypeScript content here.
</Block>
<Block name="JavaScript">
JavaScript content here.
</Block>
</BlockSwitcher>`;

      const result = transformMdxToMarkdown(input);
      expect(result).toContain('#### [TypeScript]');
      expect(result).toContain('TypeScript content here.');
      expect(result).toContain('#### [JavaScript]');
      expect(result).toContain('JavaScript content here.');
      expect(result).not.toContain('<BlockSwitcher>');
      expect(result).not.toContain('</Block>');
    });

    it('should convert Accordion to details/summary', () => {
      const input = `<Accordion title="Click to expand" headingLevel="4">Some hidden content.</Accordion>`;
      const result = transformMdxToMarkdown(input);
      expect(result).toContain('<details><summary>Click to expand</summary>');
      expect(result).toContain('Some hidden content.');
      expect(result).toContain('</details>');
    });

    it('should strip Overview component', () => {
      const input = `<Overview childPageNodes={props.childPageNodes} />

## Next section`;
      const result = transformMdxToMarkdown(input);
      expect(result).not.toContain('Overview');
      expect(result).toContain('## Next section');
    });

    it('should preserve code blocks', () => {
      const input = `Some text.

\`\`\`tsx
<InlineFilter filters={["react"]}>
  <Block name="test">
    <Callout info>This should not be transformed</Callout>
  </Block>
</InlineFilter>
\`\`\`

More text.`;

      const result = transformMdxToMarkdown(input);
      expect(result).toContain('<InlineFilter filters={["react"]}>');
      expect(result).toContain('<Block name="test">');
      expect(result).toContain('<Callout info>This should not be transformed</Callout>');
    });

    it('should strip JSX comments', () => {
      const input = `Some text.
{/* This is a comment */}
More text.`;

      const result = transformMdxToMarkdown(input);
      expect(result).not.toContain('This is a comment');
      expect(result).toContain('Some text.');
      expect(result).toContain('More text.');
    });

    it('should handle nested InlineFilters', () => {
      const input = `<InlineFilter filters={["react", "nextjs"]}>
Outer content.
<InlineFilter filters={["react"]}>Inner react only.</InlineFilter>
</InlineFilter>`;

      const result = transformMdxToMarkdown(input);
      expect(result).toContain('<!-- Platform: react, nextjs -->');
      expect(result).toContain('<!-- Platform: react -->');
      expect(result).toContain('Outer content.');
      expect(result).toContain('Inner react only.');
    });
  });

  describe('generateFrontmatter', () => {
    it('should produce valid YAML frontmatter', () => {
      const mockNode = {
        title: 'Set up Amplify Auth',
        description: 'Learn how to set up auth.',
        platforms: ['react', 'nextjs'],
        route: '/[platform]/build-a-backend/auth/set-up-auth',
        path: 'src/pages/[platform]/build-a-backend/auth/set-up-auth/index.mdx',
        lastUpdated: '2025-01-15T00:00:00.000Z',
        section: 'build-a-backend/auth'
      };

      const result = generateFrontmatter(mockNode);
      expect(result).toMatch(/^---/);
      expect(result).toMatch(/---$/);
      expect(result).toContain('title: "Set up Amplify Auth"');
      expect(result).toContain('section: "build-a-backend/auth"');
      expect(result).toContain('"react"');
      expect(result).toContain('"nextjs"');
      expect(result).toContain('gen: 2');
      expect(result).toContain('last-updated: "2025-01-15T00:00:00.000Z"');
      expect(result).toContain(
        'url: "https://docs.amplify.aws/react/build-a-backend/auth/set-up-auth/"'
      );
    });
  });

  describe('generateLlmsIndex', () => {
    it('should group pages by section', () => {
      const mockNodes = [
        {
          title: 'Set up Auth',
          description: 'Auth setup guide.',
          platforms: ['react'],
          route: '/[platform]/build-a-backend/auth/set-up-auth',
          section: 'build-a-backend'
        },
        {
          title: 'Quickstart',
          description: 'Get started quickly.',
          platforms: ['react'],
          route: '/[platform]/start/quickstart',
          section: 'start'
        },
        {
          title: 'Data Modeling',
          description: 'Model your data.',
          platforms: ['react'],
          route: '/[platform]/build-a-backend/data/data-modeling',
          section: 'build-a-backend'
        }
      ];

      const result = generateLlmsIndex(mockNodes);
      expect(result).toContain('## build-a-backend');
      expect(result).toContain('## start');
      expect(result).toContain('- [Set up Auth]');
      expect(result).toContain('- [Quickstart]');
      expect(result).toContain('- [Data Modeling]');
      expect(result).toContain(': Auth setup guide.');
      expect(result).toContain('Markdown: /ai/pages/');
    });
  });
});
