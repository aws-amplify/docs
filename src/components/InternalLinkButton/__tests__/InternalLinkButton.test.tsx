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

  it('should link to render correctly', async () => {
    render(component);
    const internalLinkButtonNode = await screen.getByRole('link');
    expect(internalLinkButtonNode.href).toContain(
      '/react/start/getting-started/introduction'
    );

    expect(internalLinkButtonNode.textContent).toBe('Get started');
  });

  it('should render optional attributes', async () => {
    render(component);
    const internalLinkButtonNode = await screen.getByRole('link');

    if (component.props.size)
      expect(internalLinkButtonNode.className).toContain(
        `amplify-button--${component.props.size}`
      );
    if (component.props.variation)
      expect(internalLinkButtonNode.className).toContain(
        `amplify-button--${component.props.variation}`
      );
    if (component.props.className)
      expect(internalLinkButtonNode.className).toContain(
        component.props.className
      );
  });
});
