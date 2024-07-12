import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ProtectedAccountMessage } from '../index';
import fs from 'fs';

const ADMINUI_START_PAGE_PATH =
  'src/pages/[platform]/tools/console/adminui/start/index.mdx';

const PROTECTED_MESSAGE = `We recommend operating Amplify workloads in dedicated accounts so IAM principals not working with Amplify do not manipulate provisioned resources out-of-band.`;

describe('Protected Account Message', () => {
  /*
        This test is to ensure that the ProtectedAccountMessage component appears on the Admin
        UI Start page and cannot be removed or modified without approval.
    */
  it('should render ProtectedAccountMessage component on the Admin UI Start page', async () => {
    const pageData = fs.readFileSync(ADMINUI_START_PAGE_PATH, {
      encoding: 'utf8'
    });
    expect(pageData).toMatch(/<ProtectedAccountMessage \/>/);
  });

  /*
      This test is to ensure that the messaging on the ProtectedAccountMessage component does not change
      and cannot be removed or modified without approval.
    */
  it('should render the protected message', async () => {
    render(<ProtectedAccountMessage />);

    const protectedNode = await screen.findByText(PROTECTED_MESSAGE);
    expect(protectedNode).toBeInTheDocument();
  });
});
