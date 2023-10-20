import * as React from 'react';
import { render, screen } from '@testing-library/react';
import InternalLink from '../index';
import { PageContext } from '../../Page';

const pageContext = {
  platform: 'js',
  integration: 'js',
  framework: 'js'
};

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: ''
    };
  }
}));
describe('InternalLink', () => {
  it('should render the InternalLink component', async () => {
    render(
      <PageContext.Provider value={pageContext}>
        <InternalLink href="/lib/auth">Internal Link</InternalLink>
      </PageContext.Provider>
    );

    const linkNode = await screen.findByText('Internal Link');
    expect(linkNode).toBeInTheDocument();
  });

  it('should add the platform to the link', async () => {
    const href = '/lib/libFile';
    render(
      <PageContext.Provider value={pageContext}>
        <InternalLink href={href}>Internal Link</InternalLink>
      </PageContext.Provider>
    );

    const linkNode = await screen.findByText('Internal Link');
    const linkHref = linkNode.href;
    expect(linkHref).toContain('/q/platform/js');
  });

  it('should add the integration to the link', async () => {
    const href = '/start/startFile';
    render(
      <PageContext.Provider value={pageContext}>
        <InternalLink href={href}>Internal Link</InternalLink>
      </PageContext.Provider>
    );

    const linkNode = await screen.findByText('Internal Link');
    const linkHref = linkNode.href;
    expect(linkHref).toContain('/q/integration/js');
  });

  it('should add the framework to the link', async () => {
    const href = '/ui/uiFile';
    render(
      <PageContext.Provider value={pageContext}>
        <InternalLink href={href}>Internal Link</InternalLink>
      </PageContext.Provider>
    );

    const linkNode = await screen.findByText('Internal Link');
    const linkHref = linkNode.href;
    expect(linkHref).toContain('/q/framework/js');
  });

  it('should not change the href if the platform already exists', async () => {
    const href = '/lib/libFile/q/platform/js';
    render(
      <PageContext.Provider value={pageContext}>
        <InternalLink href={href}>Internal Link</InternalLink>
      </PageContext.Provider>
    );

    const expectedHref = `http://localhost${href}`;
    const linkNode = await screen.findByText('Internal Link');
    const linkHref = linkNode.href;
    expect(linkHref).toEqual(expectedHref);
  });
});
