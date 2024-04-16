import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { FrameworkGrid } from '../index';

describe('FrameworkGrid', () => {
  const component = <FrameworkGrid currentKey={'react'}></FrameworkGrid>;

  it('should render the FrameworkGrid component', async () => {
    render(component);
    const framework = await screen.findByRole('link', { name: 'React' });
    expect(framework).toBeInTheDocument();
  });

  it('should highlight icon of the currentKey', async () => {
    render(component);
    const framework = await screen.findByRole('link', { name: 'React' });
    expect(framework.classList).toContain('framework-grid__link--current');
  });
});
