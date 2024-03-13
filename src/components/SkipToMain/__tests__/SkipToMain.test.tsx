import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

  it('should navigate to main page on select', async () => {
    render(page);

    const skipToMainNode = await screen.getByRole('link');
    const mainPage = await screen.getByText('Content');
    expect(skipToMainNode).toHaveAttribute('href', '#pageMain');

    skipToMainNode.focus();
    console.log(mainPage.parentElement);

    fireEvent.keyDown(skipToMainNode, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13
    });

    // userEvent.keyboard('{Enter}');
    // fireEvent.click(skipToMainNode);
    // userEvent.click(skipToMainNode);
    // fireEvent.keyDown(skipToMainNode);
    // mainPage.focus();
    // expect(mainPage).toHaveFocus();

    await waitFor(() => {
      expect(mainPage).toHaveFocus();
    });
  });
});
