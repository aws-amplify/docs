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
  const props = {
    isLegacy: true,
    url: '/[platform]/tools/cli/graphqlapi'
  };
  const component = (
    <MigrationAlert isLegacy={props.isLegacy} url={props.url} />
  );
  it('should render the MigrationAlert component', async () => {
    render(component);

    const migrationAlertNode = props.isLegacy
      ? await screen.findByRole('link', { name: /View latest documentation/i })
      : await screen.findByRole('link', {
          name: /Looking for legacy docs?/i
        });

    expect(migrationAlertNode).toBeInTheDocument();
  });

  it('should render href', async () => {
    render(component);

    const migrationAlertNode = props.isLegacy
      ? await screen.findByRole('link', { name: /View latest documentation/i })
      : await screen.findByRole('link', {
          name: /Looking for legacy docs?/i
        });

    expect(migrationAlertNode.href).toContain('/react/tools/cli/graphqlapi');
  });
});
