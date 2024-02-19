import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Banner } from '../index';

describe('Banner', () => {
  it('should render the Banner component', async () => {
    const bannerText = "Preview: AWS Amplify's new code-first DX (Gen 2)";
    render(<Banner />);

    const component = await screen.findByText(bannerText);
    expect(component).toBeInTheDocument();
  });
});
