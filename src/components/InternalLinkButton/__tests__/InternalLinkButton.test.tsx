import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { InternalLinkButton } from '../index';

describe('InternalLinkButton', () => {
  const component = (
    <InternalLinkButton
      size="large"
      className="split-button__start"
      href={{
        pathname: '/[platform]/start/getting-started/introduction/',
        query: { platform: 'react' }
      }}
    >
      Get started
    </InternalLinkButton>
  );

  it('should render the InternalLinkButton component', async () => {
    render(component);
    const internalLinkButtonNode = await screen.getByRole('link');
    expect(internalLinkButtonNode).toBeInTheDocument();
  });

  it('should render text and href', async () => {
    render(component);
    const internalLinkButtonNode = await screen.getByRole('link');
    expect(internalLinkButtonNode.href).toContain(
      '/react/start/getting-started/introduction'
    );

    expect(internalLinkButtonNode.textContent).toBe('Get started');
  });
});
