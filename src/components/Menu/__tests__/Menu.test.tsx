import * as React from 'react';
import { render } from '@testing-library/react';
import { Menu } from '../index';
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

describe('Menu', () => {
  const component = <Menu path="/"></Menu>;

  it('should render the Menu component', async () => {
    render(component);
  });
});
