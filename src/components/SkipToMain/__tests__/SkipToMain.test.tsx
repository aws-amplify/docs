import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { SkipToMain } from '../index';
// import userEvent from '@testing-library/user-event';

describe('SkipToMain', () => {
  const component = <SkipToMain mainId="pageMain" />;

  const page = (
    <div>
      <SkipToMain mainId="pageMain" />
      <main
        aria-label="Main content"
        className="amplify-flex main"
        id="pageMain"
        tabIndex={-1}
      >
        Content
      </main>
    </div>
  );

  it('should render the SkipToMain component', async () => {
    render(component);

    const skipToMainNode = await screen.getByRole('link');
    expect(skipToMainNode.textContent).toEqual('Skip to main content');
    expect(skipToMainNode).toBeInTheDocument();
  });

  it('should have link to main page anchor', async () => {
    render(page);

    const skipToMainNode = await screen.getByRole('link');
    expect(skipToMainNode).toHaveAttribute('href', '#pageMain');
  });
});
