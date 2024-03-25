import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ExternalLink from '../index';
import * as trackModule from '../../../utils/track';
import userEvent from '@testing-library/user-event';

describe('ExternalLink', () => {
  const component = (
    <ExternalLink href="https://www.amazon.com" className="footer-link">
      Click Here!
    </ExternalLink>
  );

  it('should render the ExternalLink component', async () => {
    render(component);
    const externalLink = await screen.getByRole('link', {
      name: 'Click Here!'
    });

    expect(externalLink).toBeInTheDocument();
  });

  it('should open external links in a new window', async () => {
    render(component);
    const externalLink = await screen.getByRole('link', {
      name: 'Click Here!'
    });

    expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(externalLink).toHaveAttribute('target', '_blank');
  });

  it('should trackExternalLink on click', async () => {
    jest.spyOn(trackModule, 'trackExternalLink');
    render(component);
    const externalLink = await screen.findByText('Click Here!');
    userEvent.click(externalLink);

    await waitFor(() => {
      expect(trackModule.trackExternalLink).toHaveBeenCalled();
    });
  });
});
