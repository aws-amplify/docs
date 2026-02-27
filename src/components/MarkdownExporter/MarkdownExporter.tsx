'use client';

import { useState, useCallback } from 'react';
import { Button } from '@aws-amplify/ui-react';
import { htmlToMarkdown } from './htmlToMarkdown';

export interface MarkdownExporterProps {
  pageTitle: string;
  pageDescription: string;
  section: string;
  lastUpdated: string;
}

/**
 * A client-side component that converts the current page's rendered
 * content to Markdown and copies it to the clipboard.
 *
 * Reads from the `.main` DOM element, strips site chrome, and
 * preserves headings, code blocks, lists, tables, links, and Callouts.
 */
export const MarkdownExporter = ({
  pageTitle,
  pageDescription,
  section,
  lastUpdated
}: MarkdownExporterProps) => {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const handleExport = useCallback(async () => {
    try {
      const mainEl = document.querySelector('.main') as HTMLElement | null;
      if (!mainEl) {
        throw new Error('Could not find .main content element');
      }

      const pageUrl = window.location.href;
      const markdown = htmlToMarkdown(mainEl, pageUrl);

      await copyToClipboard(markdown);
      setStatus('copied');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (err) {
      console.error('Markdown export failed:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  }, []);

  const label =
    status === 'copied'
      ? 'Copied!'
      : status === 'error'
        ? 'Unable to copy Markdown. Please try again.'
        : 'Copy page as Markdown';

  return (
    <Button
      size="small"
      onClick={handleExport}
      aria-label="Copy page as Markdown"
      className="markdown-exporter-button"
    >
      {label}
    </Button>
  );
};

/**
 * Copy text to clipboard with fallback for older browsers.
 */
async function copyToClipboard(text: string): Promise<void> {
  if (
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === 'function'
  ) {
    await navigator.clipboard.writeText(text);
    return;
  }

  // Fallback: textarea-based copy
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand('copy');
  } finally {
    document.body.removeChild(textarea);
  }
}
