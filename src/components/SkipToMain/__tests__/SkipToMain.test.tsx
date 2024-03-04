import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SkipToMain } from '../index';
// import userEvent from '@testing-library/user-event';

describe('SkipToMain', () => {
  const component = <SkipToMain mainId="pageMain" />;
  // const pageMain = (
  //   <div
  //     aria-label="Main content"
  //     className="amplify-flex main"
  //     id="pageMain"
  //     tabIndex={-1}
  //   >
  //     Content
  //   </div>
  // );
  // const content = <div>Content</div>;
  // // const pageMain = document.createElement('main');
  // // pageMain.setAttribute('aria-label', 'Main content');
  // // pageMain.setAttribute('class', 'amplify-flex main');
  // // pageMain.setAttribute('id', 'pageMain');
  // // pageMain.setAttribute('tabIndex', '-1');
  // // pageMain.appendChild(content);

  // const pageMain = React.createElement(
  //   'main',
  //   {
  //     className: 'amplify-flex main',
  //     'aria-label': 'Main content',
  //     id: 'pageMain',
  //     tabIndex: '-1'
  //   },
  //   content
  // );

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
    // const page = React.createElement(
    //   'div',
    //   {
    //     className: 'amplify-flex main'
    //   },
    //   component,
    //   pageMain
    // );
    // render(pageMain);
    // render(component);
    render(page);

    // console.log(pageMain);

    const skipToMainNode = await screen.getByRole('link');
    const mainPage = await screen.getByText('Content');
    expect(skipToMainNode).toHaveAttribute('href', '#pageMain');

    // fireEvent.focus(skipToMainNode);
    skipToMainNode.focus();
    console.log(mainPage.parentElement);
    // console.log(document.activeElement);
    // await waitFor(() => {
    //   expect(skipToMainNode).toHaveFocus();
    // });

    // fireEvent.select(skipToMainNode);
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
