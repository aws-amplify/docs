import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Callout } from '../Callout';

describe('Callout', () => {
  it('should render the Callout component', async () => {
    const consoleErrorFn = jest
      .spyOn(console, 'error')
      .mockImplementation(() => jest.fn());
    const child = <div>Callout Child</div>;
    render(
      <Callout info={true} warning={false}>
        {child}
      </Callout>
    );

    const blockNode = await screen.findByText('Callout Child');
    expect(blockNode).toBeInTheDocument();

    consoleErrorFn.mockRestore();
  });

  it('should pass the backgroundColor through to the Message component', async () => {
    const child = <div>Callout Child</div>;
    const ele = render(
      <Callout info={true} backgroundColor={'red'}>
        {child}
      </Callout>
    );

    const styles = getComputedStyle(ele.container.children[0]);
    expect(styles.backgroundColor).toBe('red');
  });
});
