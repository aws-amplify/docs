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
});
