import Feedback from '../index';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as trackModule from '../../../utils/track';

const router = jest.mock('next/router', () => ({
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
  const component = <Feedback router={router} />;

  it('should render component with thumbs up and thumbs down button', () => {
    const component = <Feedback />;

    render(component);

    const thumbsUp = screen.getByText('Yes');
    const thumbsDown = screen.getByText('No');

    expect(thumbsUp).toBeInTheDocument();
    expect(thumbsDown).toBeInTheDocument();
  });

  it('should show response text when No is clicked', async () => {
    render(component);

    const thumbsDownButton = screen.getByRole('button', { name: 'No' });

    expect(thumbsDownButton).toBeInTheDocument();

    userEvent.click(thumbsDownButton);
    const response = screen.getByRole('link');

    await waitFor(() => {
      expect(response.textContent).toBe('File an issue on GitHub');
    });
  });

  it('should call trackFeedbackSubmission request when either button is clicked', async () => {
    jest.spyOn(trackModule, 'trackFeedbackSubmission');
    render(component);
    const thumbsDownButton = screen.getByText('No');
    userEvent.click(thumbsDownButton);

    await waitFor(() => {
      expect(trackModule.trackFeedbackSubmission).toHaveBeenCalled();
    });
  });
});
