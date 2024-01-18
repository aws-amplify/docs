import fs from 'fs';

const ADMINUI_START_PAGE_PATH =
  'src/pages/[platform]/tools/console/adminui/start/index.mdx';

describe('Protected Account Message', () => {
  it('should render ProtectedAccountMessage component on the Admin UI Start page', async () => {
    const pageData = fs.readFileSync(ADMINUI_START_PAGE_PATH, {
      encoding: 'utf8'
    });
    expect(pageData).toMatch(/<ProtectedAccountMessage \/>/);
  });
});
