import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Overview } from '../index';
import { getChildPageNodes } from '@/utils/getChildPageNodes';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      query: { platform: 'react' }
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
      name: 'Authentication Enable sign-in, sign-up and sign-out within minutes with pre-built UI components and powerful authentication APIs'
    });
    const sampleOverviewCard = overviewNode;
    childPageNodes
      ? expect(sampleOverviewCard).toBeInTheDocument()
      : expect(sampleOverviewCard).not.toBeInTheDocument();
    expect(sampleOverviewCard.textContent).toContain('Authentication');
  });
});
