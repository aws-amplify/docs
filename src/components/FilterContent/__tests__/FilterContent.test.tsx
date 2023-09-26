import * as React from 'react';
import { render, screen } from '@testing-library/react';
import FilterContent from '../index';

const routerMock = {
  __esModule: true
};

jest.mock('next/router', () => routerMock);

describe('FilterContent', () => {
  const contentKeys = ['platform', 'integration', 'framework'];

  contentKeys.forEach((contentKey) => {
    it(`should include ${contentKey} content`, async () => {
      const props = {
        [contentKey]: contentKey
      };

      routerMock.useRouter = () => {
        return {
          query: props
        };
      };

      render(<FilterContent {...props}>My Content</FilterContent>);

      const contentNode = await screen.findByText('My Content');
      expect(contentNode).toBeInTheDocument();
    });
  });
});
