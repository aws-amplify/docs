import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from '../index';
// import * as trackModule from '../../../utils/track';

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

HTMLElement.prototype.animate = jest.fn();

describe('Accordion', () => {
  it('should render the Accordion component', async () => {
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
    render(component);
    const accordion = await screen.findByText(content);
    expect(accordion).toBeInTheDocument();
  });

  it('should hide the Accordion body content on load', async () => {
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
    render(component);
    const bodyText = await screen.findByText(content);
    expect(bodyText).not.toBeVisible();
  });

  it('should toggle open/closed when heading is clicked', async () => {
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
    render(component);

    const accordionHeading = screen.getByText('Accordion component example');

    // const body = await screen.findByRole('group').;
    // const accordionBody = component..getElementsByClassName('accordion__body')
    // console.log(body);
    userEvent.click(accordionHeading);

    // fireEvent.click(accordionHeading);

    await waitFor(() => {
      expect(screen.getByText(content)).toBeInTheDocument();
      expect(screen.getByText(content)).toBeVisible();
    });
    // fireEvent.animationEnd(accordionHeading);
    // fireEvent.animationStart(accordionHeading);
    // const accordionBody = await screen.findByText(content);
  });

  // it('should track Accordion open on click of heading', async () => {
  //   jest.spyOn(trackModule, 'trackExpanderOpen');

  //   render(component);

  //   const accordionHeading = await screen.findByText(
  //     'Accordion component example'
  //   );
  //   const summary = accordionHeading?.parentElement?.parentElement;
  //   console.log(accordionHeading?.parentElement?.parentElement?.parentElement);
  //   fireEvent.animationEnd(summary);
  //   userEvent.click(summary);

  //   await waitFor(() => {
  //     expect(trackModule.trackExpanderOpen).toHaveBeenCalled();
  //   });
  // });
});
