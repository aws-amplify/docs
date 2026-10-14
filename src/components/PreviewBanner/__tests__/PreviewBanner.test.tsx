import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { PreviewBanner } from '../index';

describe('PreviewBanner', () => {
  it('should render the preview notice', async () => {
    render(<PreviewBanner />);
    expect(
      await screen.findByText('This feature is in preview.')
    ).toBeInTheDocument();
  });

  it('should link to GitHub issues for feedback', async () => {
    render(<PreviewBanner />);
    const link = await screen.findByRole('link', { name: 'GitHub' });
    expect(link).toHaveAttribute(
      'href',
      'https://github.com/aws-amplify/amplify-backend/issues'
    );
  });
});
