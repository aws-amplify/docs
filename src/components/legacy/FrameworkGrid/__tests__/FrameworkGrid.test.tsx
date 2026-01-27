import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { FrameworkGrid } from '../index';

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

describe('FrameworkGrid', () => {
  const component = <FrameworkGrid currentKey="react" />;

  it('should render the FrameworkGrid component', async () => {
    render(component);
    const framework = await screen.findByRole('link', { name: 'React' });
    expect(framework).toBeInTheDocument();
  });

  it('should highlight icon of the currentKey', async () => {
    render(component);
    const framework = await screen.findByRole('link', { name: 'React' });
    expect(framework.classList).toContain('framework-grid__link--current');
  });
});
