import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Block from '../index';

describe('Block', () => {
  const child = <div>Block Child</div>;
  const component = <Block name={`test-block`}>{child}</Block>;
  it('should render the Block component', async () => {
    render(component);
    const blockNode = await screen.findByText('Block Child');
    expect(blockNode).toBeInTheDocument();
  });

  it('should display the Block title', async () => {
    render(component);
    const blockNode = await screen.findByText('Block Child');
    expect(blockNode.parentElement?.getAttribute('name')).toEqual('test-block');
  });
});
