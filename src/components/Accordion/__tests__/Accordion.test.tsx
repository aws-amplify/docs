import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from '../index';
import * as trackModule from '../../../utils/track';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: ''
    };
  }
}));

jest.mock('../../../utils/track', () => ({
  trackExpanderOpen: jest
    .fn()
    .mockImplementation(() => 'accordion-component-example')
}));

describe('Accordion', () => {
  const content =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla malesuada dignissim erat et lacinia. Quisque molestie vehicula dolor sit amet volutpat. Quisque eget orci quis mi sodales fringilla.';
  const component = (
    <Accordion
      title="Accordion component example"
      headingLevel="4"
      eyebrow="Learn more"
    >
      <p>{content}</p>
    </Accordion>
  );

  it('should render the Accordion component', async () => {
    render(component);
    const accordion = await screen.findByText(content);
    expect(accordion).toBeInTheDocument();
  });

  it('should hide the Accordion body content on load', async () => {
    render(component);
    const bodyText = await screen.findByText(content);
    expect(bodyText).not.toBeVisible();
  });

  it('should toggle open/closed when heading is clicked', async () => {
    render(component);
    const accordionHeading = await screen.findByText(
      'Accordion component example'
    );
    userEvent.click(accordionHeading);
    fireEvent.animationStart(accordionHeading);
    fireEvent.animationEnd(accordionHeading);
  });

  const accordionBody = await screen.findByText(content);
  expect(accordionBody).toBeInTheDocument();
  expect(accordionBody).not.toBeVisible();

  it('should track Accordion open on click of heading', async () => {
    jest.spyOn(trackModule, 'trackExpanderOpen');
    render(component);

    const accordionHeading = await screen.findByText(
      'Accordion component example'
    );
    userEvent.click(accordionHeading);
    await waitFor(() => {
      expect(trackModule.trackExpanderOpen).toHaveBeenCalled();
    });
  });
});
