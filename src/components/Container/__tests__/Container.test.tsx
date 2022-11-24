import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Container from '../index';

describe('Container', () => {
  it('should render the container component', async () => {
    const child = <span>Container Child</span>;
    render(<Container>{child}</Container>);

    const containerNode = await screen.findByText('Container Child');
    expect(containerNode).toBeInTheDocument();
  });
});
