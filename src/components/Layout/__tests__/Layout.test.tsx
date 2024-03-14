import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Layout } from '../index';
import flatDirectory from '../../../directory/flatDirectory.json';

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

console.log(routerMock.useRouter());

describe('Layout', () => {
  const directoryData = flatDirectory['/[platform]/how-amplify-works'];
  console.log(directoryData);
  const h1 = React.createElement('h1');
  console.log(h1);
  const children = (
    <div>
      <h1>HEADING</h1>
      <h2>Heading Two</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean accumsan
        lacinia enim, vitae accumsan lectus dapibus a. Suspendisse sollicitudin
        erat turpis, a facilisis risus convallis ut. Vivamus sed mauris
        faucibus, tincidunt quam sit amet, dictum dui. Morbi malesuada vitae
        massa id elementum. Maecenas ultricies augue ipsum, et scelerisque leo
        mollis a. Praesent non elementum velit, eget feugiat tellus. Vivamus et
        massa gravida eros gravida interdum. Nunc eget tristique nulla.
      </p>
      <p>
        Nullam feugiat ultrices augue, rutrum malesuada nunc ultricies sit amet.
        Morbi vel bibendum tortor, non viverra libero. Vivamus ut nisi posuere,
        pellentesque risus vitae, ultrices felis. Fusce ut iaculis erat, ut
        sollicitudin ipsum. Pellentesque quis odio ante. Duis cursus lobortis
        arcu, convallis sollicitudin tortor pellentesque vel. Aenean commodo
        porttitor eros iaculis maximus. Nunc vel congue nisi.
      </p>
      <h2>Heading Three</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean accumsan
        lacinia enim, vitae accumsan lectus dapibus a. Suspendisse sollicitudin
        erat turpis, a facilisis risus convallis ut. Vivamus sed mauris
        faucibus, tincidunt quam sit amet, dictum dui. Morbi malesuada vitae
        massa id elementum. Maecenas ultricies augue ipsum, et scelerisque leo
        mollis a. Praesent non elementum velit, eget feugiat tellus. Vivamus et
        massa gravida eros gravida interdum. Nunc eget tristique nulla.
      </p>
    </div>
  );

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
      {children}
    </Layout>
  );

  it('should render the Layout component', async () => {
    render(component);
    const layout = await screen.getByRole('main', { name: 'Main content' });
    expect(layout).toBeInTheDocument();
  });

  it('should render the Layout component', async () => {
    render(component);
    const main = await screen.getByRole('main', { name: 'Main content' });
    main.appendChild(children);
    // const toc = await screen.getByText('On this page');
    // console.log(toc);
  });
});
