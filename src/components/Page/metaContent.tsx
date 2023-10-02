import CodeBlockProvider from '../CodeBlockProvider/index';
import Menu from '../Menu/index';
import TableOfContents from '../TableOfContents/index';
import NextPrevious from '../NextPrevious/index';
import { ContentStyle, ChapterTitleStyle } from './styles';
import MobileMenuIcons from '../MobileMenuIcons';
import { useRef, useState } from 'react';
import { MQDesktop } from '../media';
import Feedback from '../Feedback';
import LastUpdatedDatesProvider from '../LastUpdatedProvider';
import BreadcrumbsComponent from '../Breadcrumbs';
import React from 'react';
import getBreadcrumbsItems from '../../utils/generateBreadCrumbItems';

export default function MetaContent({
  title,
  chapterTitle,
  headers,
  children,
  filters,
  filterKey,
  filterKind,
  url,
  directoryPath,
  parentPageLastUpdatedDate
}: {
  title: string;
  chapterTitle: string;
  headers: any;
  children: any;
  filters: any;
  filterKey: any;
  filterKind: any;
  url: any;
  directoryPath: any;
  parentPageLastUpdatedDate: string;
  footerRef: any;
}) {
  const menuRef = useRef(null);
  const feedbackRef = useRef(null);
  const buttonsRef = useRef(null);
  const contentsRef = useRef(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  // Slice off the "@media " string at the start for use in JS instead of CSS
  const MQDesktopJS = MQDesktop.substring(6);
  // If the media query matches, then the user is on desktop and should not see the mobile toggle
  const onDesktop =
    typeof window === 'undefined'
      ? false
      : window.matchMedia(MQDesktopJS).matches;

  const initialBreadCrumbsUrls = [
    {
      href: 'https://docs.amplify.aws/',
      label: 'Home'
    }
  ];

  initialBreadCrumbsUrls.push(
    ...url
      .split('/')
      .map((path: string): { href: string; label: string } => {
        return {
          href: '/',
          label: path
        };
      })
      .slice(1)
  );

  const generatedBreadCrumbItems = getBreadcrumbsItems(initialBreadCrumbsUrls);

  return (
    <>
      <LastUpdatedDatesProvider
        parentPageLastUpdatedDate={parentPageLastUpdatedDate}
      >
        <Menu
          filters={filters}
          filterKey={filterKey}
          filterKind={filterKind}
          url={url}
          directoryPath={directoryPath}
          ref={menuRef}
          setMenuIsOpen={setMenuIsOpen}
          buttonsRef={buttonsRef}
        ></Menu>
        <ContentStyle menuIsOpen={menuIsOpen}>
          <div>
            <BreadcrumbsComponent items={generatedBreadCrumbItems} />
            <ChapterTitleStyle>{chapterTitle}</ChapterTitleStyle>
            <div>
              <h1>{title}</h1>
            </div>
            <CodeBlockProvider>
              {children}
              <Feedback ref={feedbackRef} />
              <NextPrevious url={url} filterKey={filterKey} />
            </CodeBlockProvider>
          </div>
        </ContentStyle>

        <TableOfContents
          title={title}
          ref={contentsRef}
          buttonsRef={buttonsRef}
        >
          {headers}
        </TableOfContents>

        {!onDesktop && url != '/start' && (
          <MobileMenuIcons
            ref={buttonsRef}
            contentsRef={contentsRef}
            menuRef={menuRef}
          />
        )}
      </LastUpdatedDatesProvider>
    </>
  );
}
