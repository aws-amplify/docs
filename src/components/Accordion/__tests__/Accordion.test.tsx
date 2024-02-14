import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Accordion } from '../index';

describe('Accordion', () => {
  const accordion = (
    <Accordion
      title="Accordion example"
      headingLevel="4"
      eyebrow="Learn more"
    ></Accordion>
  );

  it('should render the Accordion component', async () => {
    render(accordion);

    const blockNode = await screen.findByText('Block Child');
    expect(blockNode).toBeInTheDocument();
  });
});
