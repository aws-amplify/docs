import { render, screen } from '@testing-library/react';
import {
  JsV5MaintenanceBanner,
  MIGRATION_GUIDE_URL
} from '../JsV5MaintenanceBanner';

describe('JsV5MaintenanceBanner', () => {
  it('renders the maintenance mode notice', () => {
    render(<JsV5MaintenanceBanner />);

    expect(screen.getByText('Maintenance Mode')).toBeInTheDocument();
    expect(
      screen.getByText(/Amplify JavaScript v5 has entered maintenance mode/)
    ).toBeInTheDocument();
  });

  it('links to the v5 to v6 migration guide', () => {
    render(<JsV5MaintenanceBanner />);

    const link = screen.getByRole('link', { name: 'migration guide' });
    expect(link).toHaveAttribute('href', MIGRATION_GUIDE_URL);
  });
});
