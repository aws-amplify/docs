import Feedback from '../index';
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
    const component = <Feedback />;

    render(component);

    const thumbsUp = screen.getByText('Yes');
    const thumbsDown = screen.getByText('No');

    expect(thumbsUp).toBeInTheDocument();
    expect(thumbsDown).toBeInTheDocument();
  });

  it('should show response text when No is clicked', async () => {
    const component = <Feedback />;

    render(component);

    const thumbsDownButton = screen.getByText('No');
    const feedbackComponent = screen.getByText('Was this page helpful?');
    const feedbackText = screen.getByText('Can you provide more details?');

    expect(thumbsDownButton).toBeInTheDocument();

    userEvent.click(feedbackComponent);

    await waitFor(() => {
      expect(feedbackText).toBeVisible();
    });
  });

  it('should call trackFeedbackSubmission request when either button is clicked', async () => {
    jest.spyOn(trackModule, 'trackFeedbackSubmission');
    const component = <Feedback />;

    render(component);
    const thumbsDownButton = screen.getByText('No');
    userEvent.click(thumbsDownButton);

    await waitFor(() => {
      expect(trackModule.trackFeedbackSubmission).toHaveBeenCalled();
    });
  });
});
