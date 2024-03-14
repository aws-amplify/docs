import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ExternalLinkButton } from '../index';
import * as trackModule from '../../../utils/track';
import userEvent from '@testing-library/user-event';

describe('ExternalLinkButton', () => {
  const component = (
    <ExternalLinkButton
      variation="primary"
      size="small"
      href="https://docs.aws.amazon.com/amplify/latest/userguide/getting-started.html"
    >
      Click Here!
    </ExternalLinkButton>
  );

  it('should render the ExternalLinkButton component', async () => {
    render(component);

    const externalLinkButtonNode = await screen.findByRole('link', {
      name: 'Click Here!'
    });
    expect(externalLinkButtonNode).toBeInTheDocument();
  });

  it('should render the ExternalLink icon', async () => {
    render(component);

    const externalLinkButtonNode = await screen.findByText('Click Here!');
    const icon = Array.from(
      externalLinkButtonNode.getElementsByClassName('amplify-icon')
    );
    const path = Array.from(icon[0].getElementsByTagName('path'))[0];
    expect(path).toHaveAttribute(
      'd',
      'M3.42857 20.5714H20.5714V13.8H24V22.2857C24 23.2325 23.2325 24 22.2857 24H1.71429C0.767512 24 0 23.2325 0 22.2857V1.71429C0 0.767512 0.767512 0 1.71429 0H10.2857V3.42857H3.42857V20.5714Z'
    );
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
