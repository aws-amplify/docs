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
  // const directoryData = flatDirectory['/[platform]/how-amplify-works'];
  // const mockData = {
  //   mainHeading: React.createElement('h1', { as: 'h1' }, 'Main Heading'),
  //   headingTwo: React.createElement('h1', {}, 'Heading Two'),
  //   headingThree: React.createElement('h1', {}, 'Heading Three'),
  //   contentOne: React.createElement(
  //     'p',
  //     {},
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean accumsan lacinia enim, vitae accumsan lectus dapibus a. Suspendisse sollicitudin erat turpis, a facilisis risus convallis ut. Vivamus sed mauris faucibus, tincidunt quam sit amet, dictum dui. Morbi malesuada vitae massa id elementum. Maecenas ultricies augue ipsum, et scelerisque leo mollis a. Praesent non elementum velit, eget feugiat tellus. Vivamus et massa gravida eros gravida interdum. Nunc eget tristique nulla.'
  //   ),
  //   contentTwo: React.createElement(
  //     'p',
  //     {},
  //     'In urna nibh, gravida non venenatis at, lacinia vel purus. Donec sed consequat massa, sit amet dignissim est. Curabitur egestas dictum dictum. Praesent nec posuere arcu. Morbi vitae risus in metus mollis luctus. Pellentesque diam lectus, congue ut felis a, tristique lacinia magna. Maecenas sem nulla, vehicula et ligula eget, porta ultrices lectus.'
  //   )
  // };
  const mockData = {
    mainHeading: {
      element: document.createElement('h1'),
      content: document.createTextNode('Main Heading')
    },
    headingTwo: {
      element: document.createElement('h2'),
      content: document.createTextNode('Heading Two')
    },
    headingThree: {
      element: document.createElement('h3'),
      content: document.createTextNode('Heading Three')
    },
    contentOne: {
      element: document.createElement('p'),
      content: document.createTextNode(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean accumsan lacinia enim, vitae accumsan lectus dapibus a. Suspendisse sollicitudin erat turpis, a facilisis risus convallis ut. Vivamus sed mauris faucibus, tincidunt quam sit amet, dictum dui. Morbi malesuada vitae massa id elementum. Maecenas ultricies augue ipsum, et scelerisque leo mollis a. Praesent non elementum velit, eget feugiat tellus. Vivamus et massa gravida eros gravida interdum. Nunc eget tristique nulla.'
      )
    },
    contentTwo: {
      element: document.createElement('p'),
      content: document.createTextNode(
        'In urna nibh, gravida non venenatis at, lacinia vel purus. Donec sed consequat massa, sit amet dignissim est. Curabitur egestas dictum dictum. Praesent nec posuere arcu. Morbi vitae risus in metus mollis luctus. Pellentesque diam lectus, congue ut felis a, tristique lacinia magna. Maecenas sem nulla, vehicula et ligula eget, porta ultrices lectus.'
      )
    }
  };

  const headingTwo = mockData.headingTwo.element.appendChild(
    mockData.headingTwo.content
  );

  // const mainHeading = React.createElement('h1', {}, 'Main Heading');
  // console.log(mockData.mainHeading);
  // const headingTwo = React.createElement('h1', {}, 'Heading Two');
  // const headingThree = React.createElement('h1', {}, 'Heading Three');
  // const contentOne = React.createElement(
  //   'p',
  //   {},
  //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean accumsan lacinia enim, vitae accumsan lectus dapibus a. Suspendisse sollicitudin erat turpis, a facilisis risus convallis ut. Vivamus sed mauris faucibus, tincidunt quam sit amet, dictum dui. Morbi malesuada vitae massa id elementum. Maecenas ultricies augue ipsum, et scelerisque leo mollis a. Praesent non elementum velit, eget feugiat tellus. Vivamus et massa gravida eros gravida interdum. Nunc eget tristique nulla.'
  // );
  // const contentTwo = React.createElement(
  //   'p',
  //   {},
  //   'In urna nibh, gravida non venenatis at, lacinia vel purus. Donec sed consequat massa, sit amet dignissim est. Curabitur egestas dictum dictum. Praesent nec posuere arcu. Morbi vitae risus in metus mollis luctus. Pellentesque diam lectus, congue ut felis a, tristique lacinia magna. Maecenas sem nulla, vehicula et ligula eget, porta ultrices lectus.'
  // );

  // const children = (
  //   <div>
  //     <h1>HEADING</h1>
  //     <h2>Heading Two</h2>
  //     <p>
  //       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean accumsan
  //       lacinia enim, vitae accumsan lectus dapibus a. Suspendisse sollicitudin
  //       erat turpis, a facilisis risus convallis ut. Vivamus sed mauris
  //       faucibus, tincidunt quam sit amet, dictum dui. Morbi malesuada vitae
  //       massa id elementum. Maecenas ultricies augue ipsum, et scelerisque leo
  //       mollis a. Praesent non elementum velit, eget feugiat tellus. Vivamus et
  //       massa gravida eros gravida interdum. Nunc eget tristique nulla.
  //     </p>
  //     <p>
  //       Nullam feugiat ultrices augue, rutrum malesuada nunc ultricies sit amet.
  //       Morbi vel bibendum tortor, non viverra libero. Vivamus ut nisi posuere,
  //       pellentesque risus vitae, ultrices felis. Fusce ut iaculis erat, ut
  //       sollicitudin ipsum. Pellentesque quis odio ante. Duis cursus lobortis
  //       arcu, convallis sollicitudin tortor pellentesque vel. Aenean commodo
  //       porttitor eros iaculis maximus. Nunc vel congue nisi.
  //     </p>
  //     <h2>Heading Three</h2>
  //     <p>
  //       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean accumsan
  //       lacinia enim, vitae accumsan lectus dapibus a. Suspendisse sollicitudin
  //       erat turpis, a facilisis risus convallis ut. Vivamus sed mauris
  //       faucibus, tincidunt quam sit amet, dictum dui. Morbi malesuada vitae
  //       massa id elementum. Maecenas ultricies augue ipsum, et scelerisque leo
  //       mollis a. Praesent non elementum velit, eget feugiat tellus. Vivamus et
  //       massa gravida eros gravida interdum. Nunc eget tristique nulla.
  //     </p>
  //   </div>
  // );

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
      <></>
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
    main.appendChild(headingTwo);
    console.log(Array.from(main.children));

    // console.log(Array.from(main.childNodes));
    // const toc = await screen.getByText('On this page');
    // console.log(toc);
  });
});
