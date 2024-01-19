import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ProtectedAccountMessage } from '../index';
import fs from 'fs';

const ADMINUI_START_PAGE_PATH =
  'src/pages/[platform]/tools/console/adminui/start/index.mdx';

const PROTECTED_MESSAGE = `We recommend operating Amplify workloads in dedicated accounts so IAM principals not working with Amplify do not manipulate provisioned resources out-of-band.`;

describe('Protected Account Message', () => {
  it('should render ProtectedAccountMessage component on the Admin UI Start page', async () => {
    const pageData = fs.readFileSync(ADMINUI_START_PAGE_PATH, {
      encoding: 'utf8'
    });
    expect(pageData).toMatch(/<ProtectedAccountMessage \/>/);
  });

  it('should render the protected message', async () => {
    render(<ProtectedAccountMessage />);

    const protectedNode = await screen.findByText(PROTECTED_MESSAGE);
    expect(protectedNode).toBeInTheDocument();
  });
});
