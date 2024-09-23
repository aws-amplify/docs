import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { NextPrevious } from '../index';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      query: { platform: 'react' },
      asPath: '/react/build-a-backend/data/data-modeling/identifiers',
      pathname: '/[platform]/build-a-backend/data/data-modeling/identifiers'
    };
  }
};

jest.mock('next/router', () => routerMock);

describe('NextPrevious', () => {
  it('should render the NextPrevious component', async () => {
    render(<NextPrevious />);
    const nextPrevNode = await screen.findByText('NEXT');
    expect(nextPrevNode).toBeInTheDocument();
  });

  it('should include href to next/prev pages', async () => {
    render(<NextPrevious />);
    const nextPrevNode: HTMLLinkElement[] = await screen.findAllByRole('link');
    expect(nextPrevNode[0].textContent).toContain('PREVIOUS');
    expect(nextPrevNode[0].href).toContain(
      '/react/build-a-backend/data/data-modeling/relationships'
    );
    expect(nextPrevNode[1].textContent).toContain('NEXT');
    expect(nextPrevNode[1].href).toContain(
      '/react/build-a-backend/data/data-modeling/secondary-index'
    );
  });

  it('should render the NextPrevious component for gen1 pages', async () => {
    routerMock.useRouter = () => {
      return {
        query: { platform: 'react' },
        asPath: '/gen1/react/tools/cli/start/set-up-cli',
        pathname: '/gen1/[platform]/tools/cli/start/set-up-cli'
      };
    };

    render(<NextPrevious />);

    const nextPrevNode: HTMLLinkElement[] = await screen.findAllByRole('link');

    expect(nextPrevNode[0]).toBeInTheDocument();

    expect(nextPrevNode[0].textContent).toContain('NEXT');
    expect(nextPrevNode[0].href).toContain(
      '/gen1/react/tools/cli/start/key-workflows'
    );
  });
});
