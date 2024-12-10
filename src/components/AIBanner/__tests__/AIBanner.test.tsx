import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { AIBanner } from '../index';

describe('AIBanner', () => {
  it('should render the AIBanner component', async () => {
    const bannerText = 'Amplify AI kit is now generally available';
    render(<AIBanner />);

    const component = await screen.findByText(bannerText);
    expect(component).toBeInTheDocument();
  });
});
