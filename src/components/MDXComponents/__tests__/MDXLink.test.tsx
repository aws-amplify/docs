import { render, screen } from '@testing-library/react';
import { MDXLink } from '../MDXLink';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      query: {
        platform: ''
      },
      asPath: ''
    };
  }
};

jest.mock('next/router', () => routerMock);

describe('MDXLink', () => {
  it('should render external link', () => {
    const externalUrl = 'https://amazon.com';
    const linkText = 'External Site';

    render(
      <MDXLink href={externalUrl} hash={undefined}>
        {linkText}
      </MDXLink>
    );

    const linkElement = screen.getByRole('link', { name: linkText });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', externalUrl);
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render internal link', () => {
    const href = '/[platform]/build-a-backend/existing-resources/cli';
    const linkText = 'Internal link';

    routerMock.useRouter = () => {
      return {
        query: {
          platform: 'react'
        },
        asPath: '/react/build-a-backend/current-page/'
      };
    };

    render(
      <MDXLink href={href} hash={undefined}>
        {linkText}
      </MDXLink>
    );

    const linkElement = screen.getByRole('link', { name: linkText });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      'href',
      href.replace('[platform]', 'react')
    );
  });

  it('should render internal link with hash', () => {
    const href =
      '/[platform]/build-a-backend/existing-resources/cli#test-hash-title';
    const linkText = 'Internal link';

    routerMock.useRouter = () => {
      return {
        query: {
          platform: 'react'
        },
        asPath: '/react/build-a-backend/current-page/'
      };
    };

    render(
      <MDXLink href={href} hash={undefined}>
        {linkText}
      </MDXLink>
    );

    const linkElement = screen.getByRole('link', { name: linkText });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      'href',
      href.replace('[platform]', 'react')
    );
  });

  it('should render hash only link', () => {
    const href = '#test-hash-title';
    const linkText = 'Internal link';

    routerMock.useRouter = () => {
      return {
        query: {
          platform: 'react'
        },
        asPath: '/react/build-a-backend/current-page/'
      };
    };

    render(
      <MDXLink href={href} hash={undefined}>
        {linkText}
      </MDXLink>
    );

    const linkElement = screen.getByRole('link', { name: linkText });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      'href',
      '/react/build-a-backend/current-page#test-hash-title'
    );
  });

  it('should render with specific platform when specified', () => {
    const href = '/react/build-a-backend/existing-resources/cli';
    const linkText = 'Internal link';

    routerMock.useRouter = () => {
      return {
        query: {
          platform: 'react'
        },
        asPath: '/react/build-a-backend/current-page/'
      };
    };

    render(
      <MDXLink href={href} hash={undefined}>
        {linkText}
      </MDXLink>
    );

    const linkElement = screen.getByRole('link', { name: linkText });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', href);
  });
});
