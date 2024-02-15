import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Columns } from '../index';

describe('Columns', () => {
  it('should render the Columns component', async () => {
    const component = (
      <Columns columns={2} gap="small" size="small" className="overview">
        <p>Test Column 1</p>
        <p>Test Column 2</p>
      </Columns>
    );
    render(component);

    const columns = await screen.findByText('Test Column 2');
    expect(columns).toBeInTheDocument();
  });
});
