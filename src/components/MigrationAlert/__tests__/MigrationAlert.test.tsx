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
  const legacyPageLinkText = 'View latest documentation',
    currentPageLinkText = 'Looking for legacy docs?';

  it('should render the MigrationAlert component', async () => {
    const component = (
      <MigrationAlert isLegacy={true} url="/[platform]/tools/cli/graphqlapi" />
    );
    render(component);
    const migrationAlertNode = await screen.findByRole('link', {
      name: legacyPageLinkText
    });
    expect(migrationAlertNode).toBeInTheDocument();
  });

  it('should render should render legacy text when isLegacy is true', async () => {
    const component = (
      <MigrationAlert isLegacy={true} url="/[platform]/tools/cli/graphqlapi" />
    );
    render(component);

    const migrationAlertNode = await screen.findByRole('link', {
      name: legacyPageLinkText
    });

    expect(migrationAlertNode).toBeInTheDocument();
  });

  it('should render should render legacy href when isLegacy is true', async () => {
    const component = (
      <MigrationAlert isLegacy={true} url="/[platform]/tools/cli/graphqlapi" />
    );
    render(component);

    const migrationAlertNode = await screen.findByRole('link', {
      name: legacyPageLinkText
    });

    expect(migrationAlertNode.getAttribute('href')).toContain(
      '/react/tools/cli/graphqlapi'
    );
  });

  it('should render should render current text when isLegacy is false', async () => {
    const component = (
      <MigrationAlert isLegacy={false} url="/[platform]/tools/cli/graphqlapi" />
    );
    render(component);

    const migrationAlertNode = await screen.findByRole('link', {
      name: currentPageLinkText
    });

    expect(migrationAlertNode).toBeInTheDocument();
  });
});
