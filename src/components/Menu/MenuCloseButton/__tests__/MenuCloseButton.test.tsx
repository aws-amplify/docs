import * as React from 'react';
import { render, screen } from '@testing-library/react';
import MenuCloseButton from '../index';

describe('MenuCloseButton', () => {
  const closeMenu = () => {};

  it('should render the MenuCloseButton', async () => {
    render(<MenuCloseButton closeMenu={closeMenu} />);

    const closeButton = await screen.findByRole('button', { hidden: true });
    expect(closeButton).toBeInTheDocument();
  });
});
