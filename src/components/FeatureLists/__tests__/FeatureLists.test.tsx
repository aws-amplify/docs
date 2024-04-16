import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { FeatureList, FeatureItem, PlatformFeatureList } from '../index';

describe('FeatureLists', () => {
  const featureListComponent = (
    <FeatureList heading="Deploy" level={2}>
      <FeatureItem
        linkText="SSR/SSG/ISR hosting support"
        href="/gen2/deploy-and-host/hosting/"
      >
        Deploy apps in Next.js, Nuxt.js, Gatsby, React, Vue, Angular (and more)
        by simply connecting your Git repository.
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
      name: 'SSR/SSG/ISR hosting support'
    });

    expect(link).toBeInTheDocument();
  });

  it('should render the PlatformFeatureList component', async () => {
    render(<PlatformFeatureList platform={'react'} />);

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
