import { generateFrontMatter, PageMeta } from '../frontMatter';

describe('generateFrontMatter', () => {
  it('should produce YAML front matter with all four fields', () => {
    const meta: PageMeta = {
      title: 'Authentication',
      description: 'Learn how to set up authentication',
      section: 'frontend',
      lastUpdated: '2025-01-15T00:00:00.000Z'
    };

    const result = generateFrontMatter(meta);

    expect(result).toContain('---');
    expect(result).toContain('title: Authentication');
    expect(result).toContain('description: Learn how to set up authentication');
    expect(result).toContain('section: frontend');
    // ISO dates contain colons, so the value gets YAML-escaped
    expect(result).toContain('lastUpdated: "2025-01-15T00:00:00.000Z"');
  });

  it('should start and end with --- delimiters', () => {
    const meta: PageMeta = {
      title: 'Test',
      description: 'Desc',
      section: 'backend',
      lastUpdated: '2025-06-01'
    };

    const result = generateFrontMatter(meta);
    const lines = result.split('\n');

    expect(lines[0]).toBe('---');
    expect(lines[lines.length - 1]).toBe('---');
  });

  it('should escape values containing colons', () => {
    const meta: PageMeta = {
      title: 'Auth: Getting Started',
      description: 'Step 1: Configure your app',
      section: 'frontend',
      lastUpdated: '2025-01-15'
    };

    const result = generateFrontMatter(meta);

    expect(result).toContain('title: "Auth: Getting Started"');
    expect(result).toContain('description: "Step 1: Configure your app"');
  });

  it('should escape values containing double quotes', () => {
    const meta: PageMeta = {
      title: 'Using "Amplify" Auth',
      description: 'The "best" approach',
      section: 'backend',
      lastUpdated: '2025-01-15'
    };

    const result = generateFrontMatter(meta);

    expect(result).toContain('title: "Using \\"Amplify\\" Auth"');
    expect(result).toContain('description: "The \\"best\\" approach"');
  });

  it('should escape values containing hash characters', () => {
    const meta: PageMeta = {
      title: 'Section #1',
      description: 'Description',
      section: 'frontend',
      lastUpdated: '2025-01-15'
    };

    const result = generateFrontMatter(meta);

    expect(result).toContain('title: "Section #1"');
  });

  it('should handle simple values without quoting', () => {
    const meta: PageMeta = {
      title: 'Simple Title',
      description: 'Simple description',
      section: 'hosting',
      lastUpdated: '2025-06-01'
    };

    const result = generateFrontMatter(meta);

    expect(result).toContain('title: Simple Title');
    expect(result).toContain('description: Simple description');
    expect(result).toContain('section: hosting');
  });

  it('should produce exactly 6 lines', () => {
    const meta: PageMeta = {
      title: 'Title',
      description: 'Desc',
      section: 'configure',
      lastUpdated: '2025-01-01'
    };

    const result = generateFrontMatter(meta);
    const lines = result.split('\n');

    // --- / title / description / section / lastUpdated / ---
    expect(lines).toHaveLength(6);
  });

  it('should handle empty string fields', () => {
    const meta: PageMeta = {
      title: '',
      description: '',
      section: '',
      lastUpdated: ''
    };

    const result = generateFrontMatter(meta);

    expect(result).toContain('title:');
    expect(result).toContain('description:');
    expect(result).toContain('section:');
    expect(result).toContain('lastUpdated:');
  });
});
