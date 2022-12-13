import * as React from 'react';
import { render, screen } from '@testing-library/react';
import MenuCloseButton from '../index';

describe('MenuCloseButton', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const closeMenu = () => {};

  it('should render the MenuCloseButton', async () => {
    // eslint-disable-next-line react/jsx-no-bind
    render(<MenuCloseButton closeMenu={closeMenu} />);

    const closeButton = await screen.findByRole('button', { hidden: true });
    expect(closeButton).toBeInTheDocument();
  });
});
