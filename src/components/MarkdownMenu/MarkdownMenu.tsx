import { useState, useRef, useEffect, useCallback } from 'react';
import { Button, Flex, Text } from '@aws-amplify/ui-react';

interface MarkdownMenuProps {
  route: string;
  isGen1?: boolean;
  isHome?: boolean;
  isOverview?: boolean;
}

function getMarkdownUrl(route: string): string {
  // Strip platform prefix and trailing slash
  // e.g. /react/build-a-backend/auth/set-up-auth/ → build-a-backend/auth/set-up-auth
  const parts = route.replace(/^\//, '').replace(/\/$/, '').split('/');
  const withoutPlatform = parts.slice(1).join('/');
  return `/ai/pages/${withoutPlatform}.md`;
}

export function MarkdownMenu({ route, isGen1, isHome, isOverview }: MarkdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Only render on Gen2 content pages (not home, Gen1, or overview/index pages)
  if (isGen1 || isHome || isOverview) return null;

  const mdUrl = getMarkdownUrl(route);

  const handleCopy = useCallback(async () => {
    try {
      const response = await fetch(mdUrl);
      if (!response.ok) return;
      const text = await response.text();
      // Guard against accidentally copying HTML (e.g. 404 page)
      if (text.trimStart().startsWith('<!DOCTYPE') || text.trimStart().startsWith('<html')) return;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setIsOpen(false);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently fail if clipboard not available
    }
  }, [mdUrl]);

  const handleOpenMd = useCallback(() => {
    window.open(mdUrl, '_blank');
    setIsOpen(false);
  }, [mdUrl]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div ref={menuRef} className="markdown-menu">
      <Button
        size="small"
        variation="link"
        className="markdown-menu__button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Flex alignItems="center" gap="xs">
          <span aria-hidden="true">✨</span>
          <Text as="span" fontSize="small">
            {copied ? 'Copied!' : 'Use with AI'}
          </Text>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden="true"
            className="markdown-menu__chevron"
          >
            <path
              d="M2 4L5 7L8 4"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Flex>
      </Button>
      {isOpen && (
        <div className="markdown-menu__dropdown" role="menu">
          <button
            className="markdown-menu__item"
            onClick={handleCopy}
            role="menuitem"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="4"
                y="4"
                width="8"
                height="8"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M10 4V2.5C10 1.95 9.55 1.5 9 1.5H2.5C1.95 1.5 1.5 1.95 1.5 2.5V9C1.5 9.55 1.95 10 2.5 10H4"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
            Copy page MD
          </button>
          <button
            className="markdown-menu__item"
            onClick={handleOpenMd}
            role="menuitem"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 1.5H12.5V4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 7L12.5 1.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M6 2H2.5C1.95 2 1.5 2.45 1.5 3V11.5C1.5 12.05 1.95 12.5 2.5 12.5H11C11.55 12.5 12 12.05 12 11.5V8"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            Open this page as MD
          </button>
        </div>
      )}
    </div>
  );
}
