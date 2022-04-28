import Feedback from '../index';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { API } from '@aws-amplify/api';
import { trackFeedbackSubmission } from '../../../utils/track';

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

jest.mock('@aws-amplify/api', () => ({
  API: {
    post: jest.fn().mockReturnValue(Promise.resolve())
  }
}));

jest.mock('../../../utils/track', () => ({
  trackFeedbackSubmission: () => {
    return true;
  }
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

  it('should show textarea asking for more feedback', async () => {
    const component = <Feedback />;

    render(component);

    const thumbsUp = screen.getByText('Yes');
    const thumbsDown = screen.getByText('No');

    expect(thumbsUp).toBeInTheDocument();
    expect(thumbsDown).toBeInTheDocument();

    userEvent.click(thumbsUp);

    await waitFor(() => {
      const textAreaLabel = screen.getByLabelText('What did we do well?');
      const textArea = document.querySelector('#feedback-comment');
      const submitButton = screen.getByText('Submit');
      const cancelButton = screen.getByText('Cancel');

      expect(textAreaLabel).toBeInTheDocument();
      expect(textArea).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });
  });

  it('should hide buttons after user clicks No button', async () => {
    const component = <Feedback />;

    render(component);

    const thumbsUp = screen.getByText('Yes');
    const thumbsDown = screen.getByText('No');

    expect(thumbsUp).toBeInTheDocument();
    expect(thumbsDown).toBeInTheDocument();

    userEvent.click(thumbsDown);

    await waitFor(() => {
      const textAreaLabel = screen.getByLabelText('What can we do better?');
      const textArea = document.querySelector('#feedback-comment');
      const submitButton = screen.getByText('Submit');
      const cancelButton = screen.getByText('Cancel');

      expect(textAreaLabel).toBeVisible();
      expect(textArea).toBeVisible();
      expect(submitButton).toBeVisible();
      expect(cancelButton).toBeVisible();
    });
  });

  it('should make Amplify POST request when either button is clicked', () => {
    const component = <Feedback/>;

    render(component);

    const thumbsDown = screen.getByText('No');

    userEvent.click(thumbsDown);

    expect(API.post).toHaveBeenCalled();
  });

  it('should make Amplify POST request when submit button is clicked', async () => {
    const component = <Feedback/>;

    render(component);

    const thumbsDown = screen.getByText('No');

    userEvent.click(thumbsDown);

    await waitFor(() => {
      const submitButton = screen.getByText('Submit');

      userEvent.click(submitButton);

      expect(API.post).toHaveBeenCalled();
    });
  });

  it('should hide the feedback textarea when cancel is clicked', async () => {
    const component = <Feedback/>;

    render(component);

    const thumbsDown = screen.getByText('No');

    userEvent.click(thumbsDown);

    await waitFor(() => {
      const textAreaLabel = screen.getByLabelText('What can we do better?');
      const textArea = document.querySelector('#feedback-comment');
      const submitButton = screen.getByText('Submit');
      const cancelButton = screen.getByText('Cancel');

      userEvent.click(cancelButton);

      expect(textAreaLabel).not.toBeVisible();
      expect(textArea).not.toBeVisible();
      expect(submitButton).not.toBeVisible();
      expect(cancelButton).not.toBeVisible();
    });
  });
});
