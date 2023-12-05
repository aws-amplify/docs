import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Fragments from '../index';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      query: {}
    };
  }
};

jest.mock('next/router', () => routerMock);

describe('Fragments', () => {
  const fragments = {
    platform: () => <span key="platform">platform</span>,
    integration: () => <span key="integration">integration</span>,
    framework: () => <span key="framework">framework</span>
  };

  it('should render the fragments component', async () => {
    const allFragment = {
      all: () => {
        return <span>Fragment</span>;
      }
    };
    render(<Fragments fragments={allFragment} />);

    const fragmentNode = await screen.findByText('Fragment');
    expect(fragmentNode).toBeInTheDocument();
  });

  for (const fragmentKey in fragments) {
    it(`should display the ${fragmentKey} fragment`, async () => {
      routerMock.useRouter = () => {
        return {
          query: {
            [fragmentKey]: fragmentKey
          }
        };
      };

      render(<Fragments fragments={fragments} />);

      const fragmentNode = await screen.findByText(fragmentKey);
      expect(fragmentNode).toBeInTheDocument();
    });
  }
});
