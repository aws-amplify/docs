import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ClassicBanner } from '../index';

describe('ClassicBanner', () => {
  it('should render the ClassicBanner component', async () => {
    const bannerText = 'Looking for the Amplify tooling-first (Gen 1) docs?';
    render(<ClassicBanner />);

    const component = await screen.findByText(bannerText);
    expect(component).toBeInTheDocument();
  });
});
