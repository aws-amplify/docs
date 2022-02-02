import Callout from '../styles';
import { render, screen } from '@testing-library/react';

describe('Callout', () => {
  test('renders info style callout when no warning prop is passed', () => {
    const {container} = render(<Callout>Text for callout</Callout>);

    const callout = container.children[0];

    expect(callout).toHaveStyle(`
      display: block;
      padding-left: 0.75rem;
      margin-bottom: 1rem;
      background-color: var(--color-ink-hv);
    `);
  });

  test('renders warning style callout when no warning prop is passed', () => {
    const {container} = render(<Callout warning><div>Warning text for callout</div></Callout>);

    const callout = container.children[0];

    expect(callout).toHaveStyle(`
      display: block;
      padding-left: 0.75rem;
      margin-bottom: 1rem;
      background-color: var(--color-orange-hv);
    `);
  });
});
