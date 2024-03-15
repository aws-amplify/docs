import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Columns } from '../index';

describe('Columns', () => {
  const component = (
    <Columns columns={2} gap="small" size="small" className="overview" as="div">
      <p>Test Column 1</p>
      <p>Test Column 2</p>
    </Columns>
  );
  it('should render the Columns component', async () => {
    render(component);
    const columns = await screen.findByText('Test Column 2');
    expect(columns).toBeInTheDocument();
  });

  it('should render two columns as div', async () => {
    render(component);
    const columns = document.getElementsByClassName('columns')[0];
    expect(columns.classList).toContain('columns--small--2');
    expect(columns.tagName).toBe('DIV');
  });
});
