import * as React from 'react';
import { render, screen } from '@testing-library/react';
import LinkCard from '../index';
import { IconGithub } from '@/components/Icons';

describe('LinkCard', () => {
  const child = <div>Child Content</div>;
  const component = (
    <LinkCard
      isExternal={true}
      href="https://github.com/aws-amplify/amplify-ui"
      icon={() => <IconGithub fontSize="2rem" />}
    >
      {child}
    </LinkCard>
  );

  it('should render the LinkCard component', async () => {
    render(component);
    const linkCardNode = await screen.findByText('Child Content');
    expect(linkCardNode).toBeInTheDocument();
  });

  it('should link to href', async () => {
    render(component);
    const linkCardNode = await screen.findByRole('link');
    expect(linkCardNode.href).toBe('https://github.com/aws-amplify/amplify-ui');
  });
});
