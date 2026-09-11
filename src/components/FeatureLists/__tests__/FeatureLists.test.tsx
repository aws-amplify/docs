import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { FeatureList, FeatureItem, PlatformFeatureList } from '../index';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      query: { platform: 'react' },
      pathname: '/gen1/',
      asPath: '/gen1/'
    };
  }
};

jest.mock('next/router', () => routerMock);

describe('FeatureLists', () => {
  const featureListComponent = (
    <FeatureList heading="Deploy" level={2}>
      <FeatureItem
        linkText="Managed hosting with Git CI/CD"
        href="/react/deploy-and-host/amplify-hosting/"
      >
        Connect your Git repository to Amplify Hosting. Your app builds and
        deploys on every push with SSR, SSG, and ISR support.
      </FeatureItem>
    </FeatureList>
  );

  it('should render the FeatureList component', async () => {
    render(featureListComponent);

    const heading = await screen.findByRole('heading', { name: 'Deploy' });

    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  it('should render the FeatureItem component', async () => {
    render(featureListComponent);

    const link = await screen.findByRole('link', {
      name: 'Managed hosting with Git CI/CD'
    });

    expect(link).toBeInTheDocument();
  });

  it('should render the PlatformFeatureList component', async () => {
    render(<PlatformFeatureList platform="react" />);

    const link = await screen.findByRole('link', {
      name: 'Simple configuration'
    });

    const heading = await screen.findByRole('heading', {
      name: 'Features for React'
    });

    expect(link).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});
