import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { SkipToMain } from '../index';

describe('SkipToMain', () => {
  const component = <SkipToMain mainId={'pageMain'} />;

  it('should render the SkipToMain component', async () => {
    render(component);
    const link = await screen.findByRole('link', {
      name: 'Skip to main content'
    });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('#pageMain');
  });
});
