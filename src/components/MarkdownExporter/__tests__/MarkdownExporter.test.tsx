/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MarkdownExporter } from '../MarkdownExporter';

// Mock the clipboard API
const mockWriteText = jest.fn().mockResolvedValue(undefined);
Object.assign(navigator, {
  clipboard: { writeText: mockWriteText }
});

// Minimal mock for @aws-amplify/ui-react Button
jest.mock('@aws-amplify/ui-react', () => ({
  Button: ({
    children,
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    onClick: () => void;
    [key: string]: unknown;
  }) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  )
}));

describe('MarkdownExporter', () => {
  const defaultProps = {
    pageTitle: 'Auth Setup',
    pageDescription: 'How to set up authentication',
    section: 'frontend',
    lastUpdated: '2026-01-15T00:00:00.000Z'
  };

  beforeEach(() => {
    mockWriteText.mockClear();

    // Set up a .main element in the DOM
    const mainEl = document.createElement('div');
    mainEl.className = 'main';
    mainEl.innerHTML = '<h2 id="intro">Introduction</h2><p>Hello world</p>';
    document.body.appendChild(mainEl);
  });

  afterEach(() => {
    const mainEl = document.querySelector('.main');
    if (mainEl) document.body.removeChild(mainEl);
  });

  it('renders the button with correct label', () => {
    render(<MarkdownExporter {...defaultProps} />);
    expect(screen.getByText('Copy page as Markdown')).toBeTruthy();
  });

  it('copies front matter + markdown to clipboard on click', async () => {
    render(<MarkdownExporter {...defaultProps} />);
    fireEvent.click(screen.getByText('Copy page as Markdown'));

    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledTimes(1);
    });

    const copied = mockWriteText.mock.calls[0][0] as string;

    // Should contain YAML front matter
    expect(copied).toContain('---');
    expect(copied).toContain('title: Auth Setup');
    expect(copied).toContain('section: frontend');
    expect(copied).toContain('lastUpdated:');

    // Should contain the page content
    expect(copied).toContain('Introduction');
    expect(copied).toContain('Hello world');
  });

  it('shows "Copied!" after successful copy', async () => {
    render(<MarkdownExporter {...defaultProps} />);
    fireEvent.click(screen.getByText('Copy page as Markdown'));

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeTruthy();
    });
  });

  it('shows error message when .main element is missing', async () => {
    // Remove the .main element
    const mainEl = document.querySelector('.main');
    if (mainEl) document.body.removeChild(mainEl);

    render(<MarkdownExporter {...defaultProps} />);
    fireEvent.click(screen.getByText('Copy page as Markdown'));

    await waitFor(() => {
      expect(
        screen.getByText('Unable to copy Markdown. Please try again.')
      ).toBeTruthy();
    });
  });
});
