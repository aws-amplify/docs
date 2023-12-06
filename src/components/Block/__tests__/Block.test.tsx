import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Block from '../index';

describe('Block', () => {
  it('should render the Block component', async () => {
    const child = <div>Block Child</div>;
    render(<Block name={`test-block`}>{child}</Block>);

    const blockNode = await screen.findByText('Block Child');
    expect(blockNode).toBeInTheDocument();
  });
});
