import React from 'react'
import {render, screen} from '@testing-library/react';
import Block from '../index';

describe('Block', () => {
  test('renders block component with name attribute', () => {
    const { container } = render(<Block name="test" children={null}></Block>);
  
    const name = container.querySelector('div[name="test"]');
    expect(name).toBeInTheDocument();
  });

  test('renders block component with children prop', () => {
    const child = <div>child div</div>;
    render(<Block name="test" children={child}></Block>);

    const childDiv = screen.getByText('child div');

    expect(childDiv).toBeInTheDocument();
  });
});
