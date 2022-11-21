import * as React from 'react';
import { render, screen } from '@testing-library/react';
import MenuOpenButton from '../index';

describe('MenuOpenButton', () => {
  const openMenu = () => {};

  it('should render the MenuCloseButton', async () => {
    render(<MenuOpenButton openMenu={openMenu} />);

    const openButton = await screen.findByRole('button', { hidden: true });
    expect(openButton).toBeInTheDocument();
  });
});
