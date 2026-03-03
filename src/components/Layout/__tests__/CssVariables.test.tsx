import * as React from 'react';
import { render, screen } from '@testing-library/react';
import * as fs from 'fs';
import * as path from 'path';
import { Layout } from '../index';

// ── Router mock (Gen2 by default) ──────────────────────────────────────────
const routerState = {
  query: { platform: 'react' } as Record<string, string>,
  pathname: '/[platform]/build-a-backend/auth/setup',
  asPath: '/react/build-a-backend/auth/setup'
};

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => routerState
}));

// jsdom does not implement scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// ── Helpers ────────────────────────────────────────────────────────────────
const variablesPath = path.resolve(__dirname, '../../../styles/variables.scss');
const variablesSrc = fs.readFileSync(variablesPath, 'utf-8');

/**
 * Extract the value of a CSS custom property from a given SCSS block.
 * Returns the first match found in `block`.
 */
function extractCssVar(block: string, varName: string): string | null {
  const re = new RegExp(`${varName.replace(/[-/]/g, '\\$&')}:\\s*([^;]+);`);
  const m = block.match(re);
  return m ? m[1].trim() : null;
}

/** Return the content of the :root { … } block. */
function getRootBlock(src: string): string {
  const start = src.indexOf(':root');
  if (start === -1) return '';
  const braceStart = src.indexOf('{', start);
  let depth = 1;
  let i = braceStart + 1;
  while (i < src.length && depth > 0) {
    if (src[i] === '{') depth++;
    if (src[i] === '}') depth--;
    i++;
  }
  return src.slice(braceStart + 1, i - 1);
}

/** Return the content of the .layout-wrapper--gen1 { … } block. */
function getGen1Block(src: string): string {
  const start = src.indexOf('.layout-wrapper--gen1');
  if (start === -1) return '';
  const braceStart = src.indexOf('{', start);
  let depth = 1;
  let i = braceStart + 1;
  while (i < src.length && depth > 0) {
    if (src[i] === '{') depth++;
    if (src[i] === '}') depth--;
    i++;
  }
  return src.slice(braceStart + 1, i - 1);
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('CSS variable definitions (variables.scss)', () => {
  const rootBlock = getRootBlock(variablesSrc);
  const gen1Block = getGen1Block(variablesSrc);

  it('should define --top-nav-height as 3rem in :root (Gen2 default)', () => {
    expect(extractCssVar(rootBlock, '--top-nav-height')).toBe('3rem');
  });

  it('should define --nav-total-height as 7rem in :root (Gen2 default)', () => {
    expect(extractCssVar(rootBlock, '--nav-total-height')).toBe('7rem');
  });

  it('should override --top-nav-height to 0rem for Gen1', () => {
    expect(extractCssVar(gen1Block, '--top-nav-height')).toBe('0rem');
  });

  it('should override --nav-total-height to 4rem for Gen1', () => {
    expect(extractCssVar(gen1Block, '--nav-total-height')).toBe('4rem');
  });
});

describe('CSS variable class application (Layout)', () => {
  const renderLayout = () =>
    render(
      <Layout
        pageTitle="Test"
        pageDescription="Test page"
        pageType="inner"
        platform="react"
        showLastUpdatedDate={false}
      >
        <p>content</p>
      </Layout>
    );

  it('should NOT apply layout-wrapper--gen1 class on Gen2 pages', () => {
    // Gen2 route (default routerState)
    routerState.asPath = '/react/build-a-backend/auth/setup';
    routerState.pathname = '/[platform]/build-a-backend/auth/setup';

    const { container } = renderLayout();
    const wrapper = container.querySelector('.layout-wrapper');
    expect(wrapper).not.toBeNull();
    expect(wrapper).not.toHaveClass('layout-wrapper--gen1');
  });

  it('should apply layout-wrapper--gen1 class on Gen1 pages', () => {
    // Switch to a Gen1 route
    routerState.asPath = '/gen1/react/start/getting-started/introduction';
    routerState.pathname =
      '/gen1/[platform]/start/getting-started/introduction';

    const { container } = renderLayout();
    const wrapper = container.querySelector('.layout-wrapper');
    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveClass('layout-wrapper--gen1');
  });
});
