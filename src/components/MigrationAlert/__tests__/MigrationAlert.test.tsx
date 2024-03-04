import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { MigrationAlert } from '../index';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      query: { platform: 'react' }
    };
  }
};

jest.mock('next/router', () => routerMock);

describe('MigrationAlert', () => {
  const component = (
    <MigrationAlert isLegacy url={'/[platform]/tools/cli/graphqlapi/'} />
  );
  it('should render the MigrationAlert component', async () => {
    render(component);

    const migrationAlertNode = await screen.findByText(
      'You are currently viewing'
    );
    console.log(migrationAlertNode);
    // expect(migrationAlert).toBeInTheDocument();
  });

  // it('should render legacy message if isLegacy', async () => {
  //   render(
  //     <MigrationAlert isLegacy url={'/[platform]/tools/cli/graphqlapi/'} />
  //   );

  //   const migrationAlert = await screen.findByText('You are currently viewing');
  //   console.log(migrationAlert);
  //   // expect(migrationAlert).toBeInTheDocument();
  // });
});
