import Feedback from '../index';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
    post: (apiName, path, init) => {
      return Promise.resolve('success');
    }
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

  it('should hide buttons after user clicks Yes button', async () => {
    const component = <Feedback />;

    render(component);

    const thumbsUp = screen.getByText('Yes');
    const thumbsDown = screen.getByText('No');

    expect(thumbsUp).toBeInTheDocument();
    expect(thumbsDown).toBeInTheDocument();

    userEvent.click(thumbsUp);

    await waitFor(() => {
      expect(thumbsUp).not.toBeInTheDocument();
      expect(thumbsDown).not.toBeInTheDocument();
    });
  });

  it('should hide buttons after user clicks No button', async () => {
    const component = <Feedback/>;

    render(component);

    const thumbsUp = screen.getByText('Yes');
    const thumbsDown = screen.getByText('No');

    expect(thumbsUp).toBeInTheDocument();
    expect(thumbsDown).toBeInTheDocument();

    userEvent.click(thumbsDown);

    await waitFor(() => {
      expect(thumbsUp).not.toBeInTheDocument();
      expect(thumbsDown).not.toBeInTheDocument();
    });
  });
});
