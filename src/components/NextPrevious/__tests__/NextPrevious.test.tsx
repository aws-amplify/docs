import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { NextPrevious } from '../index';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      query: { platform: 'react' },
      pathname: '/[platform]/build-a-backend/auth/manage-user-session'
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
    const nextPrevNode = await screen.findAllByRole('link');
    expect(nextPrevNode[0].textContent).toContain('PREVIOUS');
    expect(nextPrevNode[0].href).toContain(
      '/react/build-a-backend/auth/set-up-auth'
    );
    expect(nextPrevNode[1].textContent).toContain('NEXT');
    expect(nextPrevNode[1].href).toContain(
      '/react/build-a-backend/auth/enable-sign-up'
    );
  });
});
