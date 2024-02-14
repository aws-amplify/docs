import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Accordion } from '../index';

const component = (
  <Accordion title="test-Accordion" eyebrow="test-eyebrow">
    <div>Accordion content</div>
  </Accordion>
);

describe('Accordion', () => {
  it('should render the Accordion component', async () => {
    render(component);
    const accordionNode = await screen.findByText('test-Accordion');
    expect(accordionNode).toBeInTheDocument();
  });

  it('should render the Accordion component collapsed', async () => {
    render(component);
    const accordionContent = await screen.findByText('Accordion content');
    expect(accordionContent).toBeInTheDocument();
    expect(accordionContent).not.toBeVisible();
  });
});

// should calculate expanded height

// should be minimized at load

// should minimize on close button click

// should maximize on open button click

// should scroll to top on close button click
