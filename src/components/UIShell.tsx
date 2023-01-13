import { useEffect, useRef, useState } from 'react';
import CodeBlockProvider from './CodeBlockProvider';
import Menu from './Menu';
import TableOfContents from './TableOfContents';
import NextPrevious from './NextPrevious';
import { ContentStyle, ChapterTitleStyle } from './Page/styles';
import SidebarLayoutToggle from './SidebarLayoutToggle';
import { MQTablet } from './media';
import { FeedbackToggle } from './Feedback';
import type { PropsWithChildren } from 'react';

export type UIShellProps = PropsWithChildren<{
  title: string;
  chapterTitle: string;
  headers: any;
  filters: any;
  filterKey: string;
  filterKind: string;
  url: string;
  directoryPath: string;
  menuIsOpen: boolean;
  setMenuIsOpen: (isOpen: boolean) => void;
}>;

/**
 * UI Shell
 */
export function UIShell({
  title,
  children,
  chapterTitle,
  headers,
  filters,
  filterKey,
  filterKind,
  url,
  directoryPath,
  menuIsOpen,
  setMenuIsOpen
}: UIShellProps) {
  const [isOnDesktop, setIsOnDesktop] = useState(false);
  const menuRef = useRef(null);
  // Slice off the "@media " string at the start for use in JS instead of CSS
  const MQTabletJS = MQTablet.substring(6);
  useEffect(() => {
    // If the media query matches, then the user is on desktop and should not see the mobile toggle
    const onDesktop = window.matchMedia(MQTabletJS).matches;
    if (onDesktop) setIsOnDesktop(onDesktop);
  }, [MQTabletJS]);

  return (
    <>
      <Menu
        filters={filters}
        filterKey={filterKey}
        filterKind={filterKind}
        url={url}
        directoryPath={directoryPath}
        ref={menuRef}
        setMenuIsOpen={setMenuIsOpen}
      ></Menu>
      <ContentStyle menuIsOpen={menuIsOpen}>
        <div>
          <ChapterTitleStyle>{chapterTitle}</ChapterTitleStyle>
          <h1>{title}</h1>
          <CodeBlockProvider>
            {children}
            <NextPrevious url={url} filterKey={filterKey} />
          </CodeBlockProvider>
        </div>
      </ContentStyle>
      <TableOfContents title={title}>{headers}</TableOfContents>
      {!isOnDesktop && (
        <SidebarLayoutToggle menuRef={menuRef}>
          <img
            alt="Open menu"
            className="burger-graphic"
            src="/assets/burger.svg"
          />
          <img
            alt="Close menu"
            className="ex-graphic"
            src="/assets/close.svg"
          />
        </SidebarLayoutToggle>
      )}
      <FeedbackToggle />
    </>
  );
}
