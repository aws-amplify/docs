import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { LEFT_NAV_LINKS, RIGHT_NAV_LINKS } from '@/utils/globalnav';
import { GlobalNav, NavMenuItem } from '@/components/GlobalNav/GlobalNav';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      query: { platform: 'react' },
      pathname: '/',
      asPath: '/'
    };
  }
};

jest.mock('next/router', () => routerMock);

describe('GlobalNav', () => {
  const component = (
    <GlobalNav
      leftLinks={LEFT_NAV_LINKS as NavMenuItem[]}
      rightLinks={RIGHT_NAV_LINKS as NavMenuItem[]}
      currentSite="Docs"
      isGen1={false}
      mainId="pageMain"
    />
  );

  it('should render the GlobalNav component', async () => {
    render(component);
    const link = await screen.findByRole('link', {
      name: 'About AWS Amplify (opens in new tab)'
    });
    expect(link).toBeInTheDocument();
  });
});
