import { render, screen } from '@testing-library/react';
import { JS_PLATFORMS } from '@/data/platforms';
import {
  JsV5MaintenanceBanner,
  getMigrationGuideUrl
} from '../JsV5MaintenanceBanner';

// next/link normalizes trailing slashes based on the `trailingSlash` next.config
// setting, which is not loaded in the jest environment, so compare without it.
const hrefWithoutTrailingSlash = (name: string) =>
  screen.getByRole('link', { name }).getAttribute('href')?.replace(/\/$/, '');

describe('JsV5MaintenanceBanner', () => {
  it('renders the maintenance mode notice', () => {
    render(<JsV5MaintenanceBanner currentPlatform="react" />);

    expect(screen.getByText('JavaScript v5')).toBeInTheDocument();
    expect(
      screen.getByText(/Amplify JavaScript v5 has entered maintenance mode/)
    ).toBeInTheDocument();
  });

  it('links to the migration guide for the current platform', () => {
    render(<JsV5MaintenanceBanner currentPlatform="react" />);

    expect(hrefWithoutTrailingSlash('migration guide')).toBe(
      '/gen1/react/build-a-backend/troubleshooting/migrate-from-javascript-v5-to-v6'
    );
  });

  it('keeps readers within their own platform for every JS platform', () => {
    JS_PLATFORMS.forEach((platform) => {
      const { unmount } = render(
        <JsV5MaintenanceBanner currentPlatform={platform} />
      );

      expect(hrefWithoutTrailingSlash('migration guide')).toBe(
        `/gen1/${platform}/build-a-backend/troubleshooting/migrate-from-javascript-v5-to-v6`
      );

      unmount();
    });
  });

  it('builds a root-relative guide url so links stay within the environment', () => {
    const url = getMigrationGuideUrl('vue');

    expect(url.startsWith('/')).toBe(true);
    expect(url).not.toMatch(/^https?:\/\//);
  });
});
