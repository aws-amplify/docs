import FeedbackSticky from '../index';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  trackFeedbackSubmission: jest.fn().mockImplementation(() => true)
}));

describe('Feedback', () => {
  it('should render component with thumbs up and thumbs down button', () => {
    const footerMock = `<Footer ref={ref}></Footer>`;
    const component = <FeedbackSticky footerRef={footerMock} />;

    render(component);

    const thumbsUp = screen.getByLabelText('Yes');
    const thumbsDown = screen.getByLabelText('No');

    expect(thumbsUp).toBeInTheDocument();
    expect(thumbsDown).toBeInTheDocument();
  });

  it('should hide buttons after user clicks No button', async () => {
    const footerMock = `<Footer ref={ref}></Footer>`;
    const component = <FeedbackSticky footerRef={footerMock} />;

    render(component);

    const thumbsUp = screen.getByLabelText('Yes');
    const thumbsDown = screen.getByLabelText('No');

    expect(thumbsUp).toBeInTheDocument();
    expect(thumbsDown).toBeInTheDocument();

    userEvent.click(thumbsDown);

    await waitFor(() => {
      expect(thumbsUp).not.toBeVisible();
      expect(thumbsDown).not.toBeVisible();
    });
  });

  it('should call trackFeedbackSubmission request when either button is clicked', async () => {
    jest.spyOn(trackModule, 'trackFeedbackSubmission');
    const footerMock = `<Footer ref={ref}></Footer>`;
    const component = <FeedbackSticky footerRef={footerMock} />;

    render(component);

    const thumbsDown = screen.getByLabelText('No');

    userEvent.click(thumbsDown);

    await waitFor(() => {
      expect(trackModule.trackFeedbackSubmission).toHaveBeenCalled();
    });
  });
});
