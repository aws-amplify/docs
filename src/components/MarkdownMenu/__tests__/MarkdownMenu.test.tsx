import * as React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MarkdownMenu } from '../MarkdownMenu';

// Mock fetch and clipboard
const mockFetch = jest.fn();
const mockWriteText = jest.fn();
const mockOpen = jest.fn();

beforeEach(() => {
  global.fetch = mockFetch;
  Object.assign(navigator, {
    clipboard: { writeText: mockWriteText }
  });
  window.open = mockOpen;
  mockFetch.mockReset();
  mockWriteText.mockReset();
  mockOpen.mockReset();
});

describe('MarkdownMenu', () => {
  it('should render button with "Use with AI" label', () => {
    render(
      <MarkdownMenu route="/react/build-a-backend/auth/set-up-auth/" />
    );
    expect(screen.getByText('Use with AI')).toBeInTheDocument();
  });

  it('should not render on Gen1 pages', () => {
    const { container } = render(
      <MarkdownMenu route="/gen1/react/start/" isGen1={true} />
    );
    expect(container.innerHTML).toBe('');
  });

  it('should not render on home page', () => {
    const { container } = render(
      <MarkdownMenu route="/" isHome={true} />
    );
    expect(container.innerHTML).toBe('');
  });

  it('should show dropdown menu items on click', async () => {
    render(
      <MarkdownMenu route="/react/build-a-backend/auth/set-up-auth/" />
    );

    await act(async () => {
      userEvent.click(screen.getByText('Use with AI'));
    });

    expect(screen.getByText('Copy page MD')).toBeVisible();
    expect(screen.getByText('Open this page as MD')).toBeVisible();
  });

  it('should copy markdown to clipboard when "Copy page MD" is clicked', async () => {
    const mdContent = '# Test Page\n\nSome content.';
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(mdContent)
    });
    mockWriteText.mockResolvedValueOnce(undefined);

    render(
      <MarkdownMenu route="/react/build-a-backend/auth/set-up-auth/" />
    );

    await act(async () => {
      userEvent.click(screen.getByText('Use with AI'));
    });
    await act(async () => {
      userEvent.click(screen.getByText('Copy page MD'));
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/ai/pages/build-a-backend/auth/set-up-auth.md'
      );
    });
    expect(mockWriteText).toHaveBeenCalledWith(mdContent);
  });

  it('should open markdown file in new tab when "Open this page as MD" is clicked', async () => {
    render(
      <MarkdownMenu route="/react/build-a-backend/auth/set-up-auth/" />
    );

    await act(async () => {
      userEvent.click(screen.getByText('Use with AI'));
    });
    await act(async () => {
      userEvent.click(screen.getByText('Open this page as MD'));
    });

    expect(mockOpen).toHaveBeenCalledWith(
      '/ai/pages/build-a-backend/auth/set-up-auth.md',
      '_blank'
    );
  });

  it('should construct correct markdown URL from route', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('content')
    });
    mockWriteText.mockResolvedValueOnce(undefined);

    render(
      <MarkdownMenu route="/react/build-a-backend/auth/set-up-auth/" />
    );

    await act(async () => {
      userEvent.click(screen.getByText('Use with AI'));
    });
    await act(async () => {
      userEvent.click(screen.getByText('Copy page MD'));
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/ai/pages/build-a-backend/auth/set-up-auth.md'
      );
    });
  });

  it('should show "Copied!" feedback after copy', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('content')
    });
    mockWriteText.mockResolvedValueOnce(undefined);

    render(
      <MarkdownMenu route="/react/build-a-backend/auth/set-up-auth/" />
    );

    await act(async () => {
      userEvent.click(screen.getByText('Use with AI'));
    });
    await act(async () => {
      userEvent.click(screen.getByText('Copy page MD'));
    });

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
  });
});
