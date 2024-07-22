import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from '../index';
import * as trackModule from '../../../utils/track';

jest.mock('../../../utils/track', () => ({
  trackExpanderOpen: jest
    .fn()
    .mockImplementation(() => 'accordion-component-example')
}));

HTMLElement.prototype.animate = jest.fn();
window.scrollTo = jest.fn();

const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla malesuada dignissim erat et lacinia. Quisque molestie vehicula dolor sit amet volutpat. Quisque eget orci quis mi sodales fringilla.';
const title = 'Accordion component example';
const headingLevel = '4';
const eyebrow = 'Learn more';
const component = (
  <Accordion title={title} headingLevel={headingLevel} eyebrow={eyebrow}>
    <p>{content}</p>
  </Accordion>
);

describe('Accordion', () => {
  it('should render the Accordion component', async () => {
    render(component);
    const accordion = await screen.findByText(content);
    expect(accordion).toBeInTheDocument();
  });

  it('should render the title and eyebrow with correct classes', async () => {
    render(component);
    const t = await screen.getByText(title);
    const e = await screen.getByText(eyebrow);
    expect(t.className).toContain('accordion__heading');
    expect(e.className).toContain('accordion__eyebrow');
  });

  it('should hide the Accordion body content on load', async () => {
    render(component);
    const bodyText = await screen.findByText(content);
    expect(bodyText).not.toBeVisible();
    expect(bodyText).toBeInTheDocument();
  });

  it('should toggle Accordion when heading is clicked', async () => {
    render(component);
    const accordionHeading = screen.getByText('Accordion component example');
    const detailsEl = await screen.getByRole('group');
    const text = await screen.getByText(content);
    userEvent.click(accordionHeading);

    await waitFor(() => {
      expect(text).toBeVisible();
      expect(detailsEl).toHaveAttribute('open');
    });

    userEvent.click(accordionHeading);
    await waitFor(() => {
      expect(text).not.toBeVisible();
      expect(detailsEl).not.toHaveAttribute('open');
    });
  });

  it('should collapse Accordion and refocus on Accordion element when close button is clicked', async () => {
    render(component);
    const accordionHeading = screen.getByText('Accordion component example');
    userEvent.click(accordionHeading);
    const detailsEl = await screen.getByRole('group');

    expect(detailsEl).toHaveAttribute('open');

    const summaryEl = detailsEl.firstChild;

    const text = await screen.getByText(content);
    const closeButton = screen.getByRole('button');
    userEvent.click(closeButton);

    await waitFor(() => {
      expect(text).not.toBeVisible();
      expect(detailsEl).not.toHaveAttribute('open');
      expect(summaryEl).toHaveFocus();
    });
  });

  it('should track Accordion open on click of heading', async () => {
    jest.spyOn(trackModule, 'trackExpanderOpen');
    render(component);
    const accordionHeading = screen.getByText('Accordion component example');
    userEvent.click(accordionHeading);

    await waitFor(() => {
      expect(trackModule.trackExpanderOpen).toHaveBeenCalled();
    });
  });
});
