import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Layout } from '../index';

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
  const component = (
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

  it('should render the Layout component', async () => {
    render(component);
    const layout = await screen.getByRole('main', { name: 'Main content' });
    expect(layout).toBeInTheDocument();
  });

  // it('should show color change mode', async () => {
  //   render(component);
  //   console.log(localStorage.getItem('colorMode'));
  // });

  it('handleScroll', async () => {
    render(component);
    console.log(component.props.pageType);
    console.log(document.body.className);
  });
});
