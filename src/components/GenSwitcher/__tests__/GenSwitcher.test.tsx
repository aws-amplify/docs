import * as React from 'react';
import { render, screen, within } from '@testing-library/react';
import { GenSwitcher } from '../GenSwitcher';

describe('GenSwitcher', () => {
  it('should render GenSwitcher component', async () => {
    const testId = 'testGenSwitcher';
    render(<GenSwitcher testId={testId} />);

    const genSwitcher = screen.getByTestId(testId);

    expect(genSwitcher).toBeInTheDocument();
  });

  it('should have Gen1 in button label when isGen1 is true', async () => {
    render(<GenSwitcher isGen1={true} />);

    const button = screen.getByRole('button');
    const { getByText } = within(button);

    expect(getByText(/Gen 1/)).toBeInTheDocument();
  });

  it('should have Gen2 in button label when isGen1 is false', async () => {
    render(<GenSwitcher />);

    const button = screen.getByRole('button');
    const { getByText } = within(button);

    expect(getByText(/Gen 2/)).toBeInTheDocument();
  });

  it('should have current class applied to Gen1 link when isGen1 is true ', async () => {
    render(<GenSwitcher isGen1={true} />);

    const gen1Link = screen.getByRole('link', { name: 'Gen 1' });

    expect(gen1Link.classList).toContain('popover-list__link--current');
  });

  it('should have current class applied to Gen2 link when isGen1 is false ', async () => {
    render(<GenSwitcher />);

    const gen1Link = screen.getByRole('link', { name: 'Gen 2' });

    expect(gen1Link.classList).toContain('popover-list__link--current');
  });
});
