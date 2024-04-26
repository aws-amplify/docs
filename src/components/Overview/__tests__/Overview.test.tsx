import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Overview } from '../index';
import { getChildPageNodes } from '@/utils/getChildPageNodes';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      query: { platform: 'react' },
      pathname: '/[platform]/build-a-backend/',
      asPath: '/[platform]/build-a-backend/'
    };
  }
};

jest.mock('next/router', () => routerMock);

describe('Overview', () => {
  const childPageNodes = getChildPageNodes('/[platform]/build-a-backend');
  const component = <Overview childPageNodes={childPageNodes} />;

  it('should render the Overview component', async () => {
    render(component);
    const overviewNode = await screen.getByRole('link', {
      name: 'Authentication Learn about the authentication capabilities of AWS Amplify.'
    });
    const sampleOverviewCard = overviewNode;
    expect(sampleOverviewCard).toBeInTheDocument();
  });
});
