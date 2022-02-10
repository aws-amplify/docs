import Callout from '../styles';
import { render, screen } from '@testing-library/react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

function renderWithProvider(ui) {
  const myCache = createCache({ key: 'my-cache-key' });
  myCache.compat = true;

  const Wrapper = ({ children }) => (
    <CacheProvider value={myCache}>{children}</CacheProvider>
  );

  return render(ui, { wrapper: Wrapper });
}

describe('Callout', () => {
  test('renders info style callout when no warning prop is passed', () => {
    const { container } = renderWithProvider(
      <Callout>Text for callout</Callout>
    );

    const callout = container.children[0];

    expect(callout).toHaveStyle(`
      display: block;
      padding-left: 0.75rem;
      margin-bottom: 1rem;
      background-color: var(--color-ink-hv);
    `);
  });

  test('renders warning style callout when no warning prop is passed', () => {
    const { container } = renderWithProvider(
      <Callout warning>
        <div>Warning text for callout</div>
      </Callout>
    );

    const callout = container.children[0];

    expect(callout).toHaveStyle(`
      display: block;
      padding-left: 0.75rem;
      margin-bottom: 1rem;
      background-color: var(--color-orange-hv);
    `);
  });
});
