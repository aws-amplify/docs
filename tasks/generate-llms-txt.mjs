import { promises as fs, readFileSync } from 'fs';
import path from 'path';

const AI_PATH = './public/ai';
const PAGES_PATH = `${AI_PATH}/pages`;
const DOMAIN = 'https://docs.amplify.aws';
const PROJECT_ROOT = path.resolve('.');

/**
 * Recursively walk directory.json and collect Gen2 page nodes
 * (routes starting with /[platform]/).
 */
export function collectGen2Pages(node, section = '') {
  const pages = [];

  if (!node) return pages;

  const route = node.route || '';
  const isGen2 = route.startsWith('/[platform]/');
  const isExternal = node.isExternal === true;

  if (isGen2 && !isExternal && node.title) {
    // Extract section: everything between /[platform]/ and the last segment
    const routeWithoutPlatform = route.replace('/[platform]/', '');
    const parts = routeWithoutPlatform.split('/');
    const pageSection = parts.length > 1 ? parts.slice(0, -1).join('/') : parts[0];

    pages.push({
      title: node.title,
      description: node.description || '',
      platforms: node.platforms || [],
      route: node.route,
      path: node.path,
      lastUpdated: node.lastUpdated || '',
      section: section || pageSection
    });
  }

  if (node.children) {
    // Determine section from this node if it's a Gen2 container
    const currentSection = isGen2 && route
      ? route.replace('/[platform]/', '').split('/')[0]
      : section;

    for (const child of node.children) {
      const childSection = isGen2
        ? route.replace('/[platform]/', '')
        : currentSection;
      pages.push(...collectGen2Pages(child, childSection));
    }
  }

  return pages;
}

/**
 * Strip an export block that starts with the given prefix, handling nested braces.
 */
function stripExportBlock(content, prefix) {
  const idx = content.indexOf(prefix);
  if (idx === -1) return content;

  // Find the first opening brace after the prefix
  const braceStart = content.indexOf('{', idx);
  if (braceStart === -1) return content;

  // Count braces to find the matching closing brace
  let depth = 0;
  let i = braceStart;
  for (; i < content.length; i++) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') {
      depth--;
      if (depth === 0) break;
    }
  }

  // Remove from prefix start to after the closing brace (and optional semicolons/whitespace)
  let end = i + 1;
  while (end < content.length && (content[end] === ';' || content[end] === '\n' || content[end] === '\r' || content[end] === ' ')) {
    end++;
  }

  return content.slice(0, idx) + content.slice(end);
}

/**
 * Transform raw MDX content into clean markdown.
 */
export function transformMdxToMarkdown(rawMdx, srcDir = './src') {
  let content = rawMdx;

  // Step 1: Extract fenced code blocks as placeholders
  const codeBlocks = [];
  content = content.replace(/```[\s\S]*?```/g, (match) => {
    const index = codeBlocks.length;
    codeBlocks.push(match);
    return `__CODE_BLOCK_${index}__`;
  });

  // Step 2: Strip export blocks (meta, getStaticPaths, getStaticProps)
  // Use brace-counting to handle nested braces
  content = stripExportBlock(content, 'export const meta');
  content = stripExportBlock(content, 'export function getStaticPaths');
  content = stripExportBlock(content, 'export const getStaticPaths');
  content = stripExportBlock(content, 'export function getStaticProps');
  content = stripExportBlock(content, 'export const getStaticProps');
  // Catch any remaining single-line export statements
  content = content.replace(/^export\s+(const|function|default)\s+.*$/gm, '');

  // Step 3: Resolve Fragments - capture imports and inline content
  const fragmentImports = {};
  const importRegex = /import\s+(\w+)\s+from\s+['"]([^'"]+\.mdx)['"]\s*;?/g;
  let importMatch;
  while ((importMatch = importRegex.exec(content)) !== null) {
    fragmentImports[importMatch[1]] = importMatch[2];
  }

  // Replace <Fragments fragments={{ platform: varName, ... }} /> with inlined content
  content = content.replace(
    /<Fragments\s+fragments=\{\{[\s\S]*?\}\}\s*\/>/g,
    (match) => {
      // Extract the variable names from the fragments prop
      const varNames = new Set();
      const varRegex = /:\s*(\w+)/g;
      let varMatch;
      while ((varMatch = varRegex.exec(match)) !== null) {
        varNames.add(varMatch[1]);
      }

      // Inline the first unique fragment (they're typically the same content for all platforms)
      for (const varName of varNames) {
        const fragmentPath = fragmentImports[varName];
        if (fragmentPath) {
          try {
            const resolvedPath = path.resolve(srcDir, '..', fragmentPath);
            // Ensure the resolved path stays within the project root
            if (!resolvedPath.startsWith(PROJECT_ROOT)) {
              continue;
            }
            const fragmentContent = readFileSync(resolvedPath, 'utf-8');
            return transformMdxToMarkdown(fragmentContent, srcDir);
          } catch {
            // If we can't read the fragment, just remove the tag
          }
        }
      }
      return '';
    }
  );

  // Step 4: Strip import statements
  content = content.replace(/^import\s+.*?;\s*$/gm, '');
  content = content.replace(/^import\s+.*?from\s+['"].*?['"]\s*$/gm, '');

  // Step 5: Convert <InlineFilter filters={[...]}>...</InlineFilter>
  // The regex matches innermost InlineFilter pairs first. Multiple passes handle
  // nesting — each pass peels off one layer. We loop until no more replacements
  // occur rather than using a fixed count.
  let prevContent;
  do {
    prevContent = content;
    content = content.replace(
      /<InlineFilter\s+filters=\{(\[.*?\])\}>([\s\S]*?)<\/InlineFilter>/g,
      (match, filters, inner) => {
        // Clean up the filter list
        const filterList = filters.replace(/[[\]'"]/g, '').trim();
        return `<!-- Platform: ${filterList} -->\n${inner.trim()}\n<!-- /Platform -->`;
      }
    );
  } while (content !== prevContent);

  // Step 6: Convert <BlockSwitcher>/<Block name="X"> → #### [X]
  content = content.replace(/<BlockSwitcher>/g, '');
  content = content.replace(/<\/BlockSwitcher>/g, '');
  content = content.replace(/<Block\s+name="([^"]*)">/g, (match, name) => {
    return `#### [${name}]`;
  });
  content = content.replace(/<\/Block>/g, '');

  // Step 7: Convert <Callout info|warning> → blockquote
  content = content.replace(
    /<Callout\s+(info|warning)(?:\s*=\s*\{?\s*true\s*\}?)?>([\s\S]*?)<\/Callout>/g,
    (match, type, inner) => {
      const label = type === 'warning' ? 'Warning' : 'Info';
      const lines = inner.trim().split('\n');
      return lines.map((line, i) => {
        if (i === 0) return `> **${label}:** ${line}`;
        return `> ${line}`;
      }).join('\n');
    }
  );

  // Step 8: Convert <Accordion title="X"> → <details><summary>
  content = content.replace(
    /<Accordion\s+title="([^"]*)"(?:\s+[^>]*)?>/g,
    '<details><summary>$1</summary>'
  );
  content = content.replace(/<\/Accordion>/g, '</details>');

  // Step 9: Strip <Overview>, <Video>, <YoutubeEmbed>
  content = content.replace(/<Overview\s+childPageNodes=\{[^}]*\}\s*\/>/g, '');
  content = content.replace(/<Video\s+src="([^"]*)"[^/]*\/>/g, '');
  content = content.replace(/<YoutubeEmbed\s+embedId="([^"]*)"[^/]*\/>/g, '');

  // Step 10: Strip JSX comments {/* ... */}
  content = content.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

  // Step 11: Restore code block placeholders
  content = content.replace(/__CODE_BLOCK_(\d+)__/g, (match, index) => {
    return codeBlocks[parseInt(index)];
  });

  // Step 12: Clean up excessive blank lines
  content = content.replace(/\n{3,}/g, '\n\n');

  return content.trim();
}

/**
 * Generate YAML frontmatter for a page node.
 */
export function generateFrontmatter(pageNode) {
  const routeWithoutPlatform = pageNode.route.replace('/[platform]/', '');
  const section = routeWithoutPlatform.includes('/')
    ? routeWithoutPlatform.split('/').slice(0, -1).join('/')
    : routeWithoutPlatform;
  const platformsStr = pageNode.platforms.map((p) => `"${p}"`).join(', ');
  const url = `${DOMAIN}/react/${routeWithoutPlatform}/`;

  return `---
title: "${pageNode.title.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"
section: "${section}"
platforms: [${platformsStr}]
gen: 2
last-updated: "${pageNode.lastUpdated}"
url: "${url}"
---`;
}

/**
 * Generate the llms.txt index file content.
 */
export function generateLlmsIndex(pageNodes) {
  const lines = [
    '# AWS Amplify Gen 2 Documentation',
    '',
    '> AWS Amplify documentation for building fullstack apps with TypeScript.',
    '',
    `Docs: ${DOMAIN}`,
    ''
  ];

  // Group by top-level section
  const sections = new Map();
  for (const node of pageNodes) {
    const routeWithoutPlatform = node.route.replace('/[platform]/', '');
    const topSection = routeWithoutPlatform.split('/')[0];
    if (!sections.has(topSection)) {
      sections.set(topSection, []);
    }
    sections.get(topSection).push(node);
  }

  for (const [sectionName, nodes] of sections) {
    lines.push(`## ${sectionName}`, '');
    for (const node of nodes) {
      const routeWithoutPlatform = node.route.replace('/[platform]/', '');
      const url = `${DOMAIN}/react/${routeWithoutPlatform}/`;
      const mdUrl = `/ai/pages/${routeWithoutPlatform}.md`;
      let entry = `- [${node.title}](${url})`;
      if (node.description) {
        entry += `: ${node.description}`;
      }
      lines.push(entry, `  Markdown: ${mdUrl}`);
    }
    lines.push('');
  }

  return lines.join('\n').trim() + '\n';
}

/**
 * Generate the llms-full.txt concatenated file content.
 */
export function generateLlmsFull(pageNodes, contentsMap) {
  const lines = [
    '# AWS Amplify Gen 2 Documentation (Full)',
    '',
    '> Complete documentation export for AI coding assistants.',
    `> Generated: ${new Date().toISOString().split('T')[0]}`,
    '',
    '## Table of Contents',
    ''
  ];

  // Table of contents
  for (const node of pageNodes) {
    const routeWithoutPlatform = node.route.replace('/[platform]/', '');
    const anchor = routeWithoutPlatform.replace(/\//g, '-');
    lines.push(`- [${node.title}](#${anchor})`);
  }
  lines.push('', '---', '');

  // Concatenated pages
  for (const node of pageNodes) {
    const content = contentsMap.get(node.route) || '';
    const frontmatter = generateFrontmatter(node);
    lines.push(frontmatter, '', content, '', '---', '');
  }

  return lines.join('\n');
}

/**
 * Read and transform a single MDX page file to markdown.
 */
async function processPage(pageNode) {
  try {
    const mdxPath = path.resolve(pageNode.path);
    const rawMdx = await fs.readFile(mdxPath, 'utf-8');
    return transformMdxToMarkdown(rawMdx, path.dirname(mdxPath));
  } catch (error) {
    console.warn(`Warning: Could not read ${pageNode.path}: ${error.message}`);
    return '';
  }
}

/**
 * Ensure a directory exists, creating it recursively if needed.
 */
async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

/**
 * Main orchestrator: generate all llms.txt outputs.
 */
export async function generateLlmsTxt() {
  console.log('Generating llms.txt files...');

  // Step 1: Collect all Gen2 pages from directory.json
  const directoryRaw = await fs.readFile('./src/directory/directory.json', 'utf-8');
  const directory = JSON.parse(directoryRaw);
  const platformRoot = directory.children?.find(
    (child) => child.path === 'src/pages/[platform]/index.tsx'
  );
  if (!platformRoot) {
    console.error('Could not find [platform] root in directory.json');
    return;
  }

  const pageNodes = collectGen2Pages(platformRoot);
  console.log(`Found ${pageNodes.length} Gen2 pages`);

  // Step 2: Process all pages - read MDX and transform to markdown
  const contentsMap = new Map();
  for (const node of pageNodes) {
    const content = await processPage(node);
    contentsMap.set(node.route, content);
  }

  // Step 3: Write output files
  await ensureDir(PAGES_PATH);

  // Collect all unique directories needed, then create them in parallel
  const dirs = new Set();
  for (const node of pageNodes) {
    const routeWithoutPlatform = node.route.replace('/[platform]/', '');
    const pagePath = `${PAGES_PATH}/${routeWithoutPlatform}.md`;
    dirs.add(path.dirname(pagePath));
  }
  await Promise.all([...dirs].map((dir) => ensureDir(dir)));

  // Write individual page files in parallel
  await Promise.all(
    pageNodes.map((node) => {
      const routeWithoutPlatform = node.route.replace('/[platform]/', '');
      const pagePath = `${PAGES_PATH}/${routeWithoutPlatform}.md`;
      const frontmatter = generateFrontmatter(node);
      const content = contentsMap.get(node.route) || '';
      return fs.writeFile(pagePath, `${frontmatter}\n\n${content}\n`);
    })
  );
  console.log(`Wrote ${pageNodes.length} individual page files`);

  // Write llms.txt and llms-full.txt in parallel
  const indexContent = generateLlmsIndex(pageNodes);
  const fullContent = generateLlmsFull(pageNodes, contentsMap);
  await Promise.all([
    fs.writeFile(`${AI_PATH}/llms.txt`, indexContent),
    fs.writeFile(`${AI_PATH}/llms-full.txt`, fullContent)
  ]);
  console.log(`Wrote ${AI_PATH}/llms.txt`);
  console.log(`Wrote ${AI_PATH}/llms-full.txt`);

  console.log('llms.txt generation complete.');
}

// Allow running standalone: node tasks/generate-llms-txt.mjs
const isMainModule = typeof process !== 'undefined' &&
  process.argv[1] &&
  process.argv[1].includes('generate-llms-txt');
if (isMainModule) {
  generateLlmsTxt().catch(console.error);
}
