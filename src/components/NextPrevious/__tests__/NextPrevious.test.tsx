import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { NextPrevious } from '../index';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      pathname: '/[platform]/build-a-backend/auth/manage-user-session',
      query: { platform: 'react' },
      asPath: '/[platform]/build-a-backend/auth/manage-user-session'
    };
  }
};

jest.mock('next/router', () => routerMock);

describe('NextPrevious', () => {
  const component = <NextPrevious />;
  it('should render the NextPrevious component', async () => {
    render(component);
    const nextPrevNode = await screen.findByText('NEXT');
    expect(nextPrevNode).toBeInTheDocument();
  });

  it('should include href to next/prev pages', async () => {
    render(component);
    const nextPrevNode = await screen.findAllByRole('link');
    expect(nextPrevNode[0].textContent).toContain('PREVIOUS');
    expect(nextPrevNode[0].getAttribute('href')).toContain(
      '/react/build-a-backend/auth/add-social-provider'
    );
    expect(nextPrevNode[1].textContent).toContain('NEXT');
    expect(nextPrevNode[1].getAttribute('href')).toContain(
      '/react/build-a-backend/auth/manage-user-profile'
    );
  });
});
