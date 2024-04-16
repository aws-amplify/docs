import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Layout } from '../index';
import { LayoutProvider } from '../index';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      query: { platform: 'react' },
      pathname: '/[platform]/start/getting-started/introduction/',
      asPath: '/[platform]/start/getting-started/introduction/'
    };
  }
};

jest.mock('next/router', () => routerMock);

describe('Layout', () => {
  const toggleMenuOpen = jest.fn();
  const handleColorModeChange = jest.fn();

  // jest.mock('react', () => ({
  //   useState: (initial) => [initial, toggleMenuOpen]
  // }));

  // jest.mock('react', () => ({
  //   useState: (initial) => [initial, mockHandleColorModeChange]
  // }));

  const layoutComponent = (
    <Layout
      pageTitle="Title"
      pageDescription="Description"
      pageType="home"
      platform="react"
      hasTOC={true}
      useCustomTitle={false}
      showBreadcrumbs={true}
      showLastUpdatedDate={true}
    >
      <>Content</>
    </Layout>
  );

  const layoutProviderComponent = (
    <LayoutProvider
      value={{
        colorMode: 'light',
        menuOpen: 'false',
        toggleMenuOpen,
        handleColorModeChange
      }}
    >
      {layoutComponent}
    </LayoutProvider>
  );

  it('should render the Layout component', async () => {
    render(layoutComponent);
    const layout = await screen.getByRole('main', { name: 'Main content' });
    expect(layout).toBeInTheDocument();
  });

  it('colorChangeMode test', async () => {
    render(layoutProviderComponent);
    // expect(toggleMenuOpen).toHaveBeenCalled();
    // expect(handleColorModeChange).toHaveBeenCalledWith(2);

    // expect(window.localStorage.getItem('colorMode')).toBe('system');
  });

  it('handleScroll test', async () => {
    // render(component);
    // console.log(component.props.pageType);
    // console.log(document.body.className);
  });

  it('heading if test', async () => {
    // render(component);
  });
});
