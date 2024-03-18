import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Layout } from '../index';
// import flatDirectory from '../../../directory/flatDirectory.json';

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
      pageType="inner"
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

  it('should ', async () => {
    render(component);
    const main = await screen.getByRole('main', { name: 'Main content' });
    console.log(Array.from(main.children));

    // console.log(Array.from(main.childNodes));
    // const toc = await screen.getByText('On this page');
    // console.log(toc);
  });
});
