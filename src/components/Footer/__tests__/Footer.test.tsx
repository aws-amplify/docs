import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '../index';

describe('Footer', () => {
  const component = <Footer hasTOC={true} />;
  it('should render the Footer component', async () => {
    render(component);
    const footer = await screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('should render component that matches snapshot', () => {
    const { container } = render(component);
    expect(container.outerHTML).toMatchSnapshot();
  });

  it('should link to terms, privacy, and social media accounts', async () => {
    render(component);
    const footerLinks = await screen.getAllByRole('link');
    const linkUrls = {
      Discord: 'https://discord.gg/amplify',
      X: 'https://x.com/AWSAmplify',
      Github: 'https://github.com/aws-amplify',
      'site terms': 'https://aws.amazon.com/terms/',
      'privacy policy': 'https://aws.amazon.com/privacy/'
    };

    for (let i = 0; i < footerLinks.length; i++) {
      expect(footerLinks[i].getAttribute('href')).toBe(
        linkUrls[footerLinks[i].textContent]
      );
    }
  });

  it('should have styling specific to whether TOC is present or not', async () => {
    render(component);
    const footer = await screen.getByRole('contentinfo');
    expect(footer.classList).toContain('footer--toc');
  });
});
