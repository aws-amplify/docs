import * as React from 'react';
import { render } from '@testing-library/react';
import {
  ProtectedRedactionGen1Message,
  ProtectedRedactionGen2Message
} from '../index';
import fs from 'fs';

// REALTIME DATA
const GEN1_V5_REALTIME_DATA_PAGE_PATH =
  'src/pages/gen1/[platform]/prev/build-a-backend/graphqlapi/subscribe-data/index.mdx';

const GEN1_V6_REALTIME_DATA_PAGE_PATH =
  'src/pages/gen1/[platform]/build-a-backend/graphqlapi/subscribe-data/index.mdx';

const GEN2_REALTIME_DATA_PAGE_PATH =
  'src/pages/[platform]/build-a-backend/data/subscribe-data/index.mdx';

// DATA MODELING

const GEN1_V6_DATA_MODELING_PAGE_PATH =
  'src/pages/gen1/[platform]/build-a-backend/graphqlapi/data-modeling/index.mdx';

const GEN2_DATA_MODELING_PAGE_PATH =
  'src/pages/[platform]/build-a-backend/data/data-modeling/relationships/index.mdx';

describe('Protected Redaction Messages', () => {
  /*
        This test is to ensure that the ProtectedRedactionGen1Message component appears on the Gen 1 realtime data pages and cannot be removed or modified without approval.
    */
  it('should render ProtectedRedactionGen1Message component on the Gen 1 V5 realtime data page', async () => {
    const pageData = fs.readFileSync(GEN1_V5_REALTIME_DATA_PAGE_PATH, {
      encoding: 'utf8'
    });
    expect(pageData).toMatch(/<ProtectedRedactionGen1Message \/>/);
  });

  it('should render ProtectedRedactionGen1Message component on the Gen 1 V6 realtime data page', async () => {
    const pageData = fs.readFileSync(GEN1_V6_REALTIME_DATA_PAGE_PATH, {
      encoding: 'utf8'
    });
    expect(pageData).toMatch(/<ProtectedRedactionGen1Message \/>/);
  });

  it('should render ProtectedRedactionGen1Message component on the Gen 2 realtime data page', async () => {
    const pageData = fs.readFileSync(GEN2_REALTIME_DATA_PAGE_PATH, {
      encoding: 'utf8'
    });
    expect(pageData).toMatch(/<ProtectedRedactionGen2Message \/>/);
  });

  it('should render ProtectedRedactionGen1Message component on the Gen 1 V6 data modeling page', async () => {
    const pageData = fs.readFileSync(GEN1_V6_DATA_MODELING_PAGE_PATH, {
      encoding: 'utf8'
    });
    expect(pageData).toMatch(/<ProtectedRedactionGen1Message \/>/);
  });

  it('should render ProtectedRedactionGen1Message component on the Gen 2 data modeling page', async () => {
    const pageData = fs.readFileSync(GEN2_DATA_MODELING_PAGE_PATH, {
      encoding: 'utf8'
    });
    expect(pageData).toMatch(/<ProtectedRedactionGen2Message \/>/);
  });

  /*
      This test is to ensure that the messaging on the ProtectedRedactionGen1Message component does not change
      and cannot be removed or modified without approval.
    */
  it('should render the protected redaction message for Gen 1', async () => {
    const { container } = render(<ProtectedRedactionGen1Message />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the protected redaction message for Gen 2', async () => {
    const { container } = render(<ProtectedRedactionGen2Message />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
