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
import LinkCardCollection from '../LinkCardCollection';
import LinkCard from '../LinkCard';
import PlatformFeatures from '../PlatformFeatures';
import CategoryFeature from '../CategoryFeature';
import CategoryFeatureLink from '../CategoryFeatureLink';
import CategoryFeatureText from '../CategoryFeatureText';

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
  parentPageLastUpdatedDate,
  footerRef
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
            <LinkCardCollection>
              {' '}
              {/* Todo remove these added for testing purpose */}
              <LinkCard isExternal={true} href={''} imageUrl={''} imgAltText="">
                {'CardData.name'}
              </LinkCard>
              <LinkCard isExternal={true} href={''} imageUrl={''} imgAltText="">
                {'CardData.name'}
              </LinkCard>
              <LinkCard isExternal={true} href={''} imageUrl={''} imgAltText="">
                {'CardData.name'}
              </LinkCard>
              <LinkCard isExternal={true} href={''} imageUrl={''} imgAltText="">
                {'CardData.name'}
              </LinkCard>
            </LinkCardCollection>
            <PlatformFeatures platform="Javascript">
              <CategoryFeature category="Auth">
                <CategoryFeatureLink
                  isExternal={true}
                  href="https://docs.amplify.aws/"
                >
                  {'Enable Signup sign-in, and sign-out'}
                </CategoryFeatureLink>
                <CategoryFeatureText>
                  {
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
                  }
                </CategoryFeatureText>
                <CategoryFeatureLink
                  isExternal={true}
                  href="https://docs.amplify.aws/"
                >
                  {'MFA'}
                </CategoryFeatureLink>
                <CategoryFeatureText>
                  {
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
                  }
                </CategoryFeatureText>
                <CategoryFeatureLink
                  isExternal={true}
                  href="https://docs.amplify.aws/"
                >
                  {'Other'}
                </CategoryFeatureLink>
                <CategoryFeatureText>
                  {
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
                  }
                </CategoryFeatureText>
              </CategoryFeature>
              <CategoryFeature category="Data">
                <CategoryFeatureLink
                  isExternal={true}
                  href="https://docs.amplify.aws/"
                >
                  {'Set up your data stack'}
                </CategoryFeatureLink>
                <CategoryFeatureText>
                  {
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
                  }
                </CategoryFeatureText>
                <CategoryFeatureLink
                  isExternal={true}
                  href="https://docs.amplify.aws/"
                >
                  {'MFA'}
                </CategoryFeatureLink>
                <CategoryFeatureText>
                  {
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
                  }
                </CategoryFeatureText>
                <CategoryFeatureLink
                  isExternal={true}
                  href="https://docs.amplify.aws/"
                >
                  {'Set up custom queries and mutations'}
                </CategoryFeatureLink>
                <CategoryFeatureText>
                  {
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
                  }
                </CategoryFeatureText>
              </CategoryFeature>
              <CategoryFeature category="Storage">
                <CategoryFeatureLink
                  isExternal={true}
                  href="https://docs.amplify.aws/"
                >
                  {'Sub JTBD name'}
                </CategoryFeatureLink>
                <CategoryFeatureText>
                  {
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
                  }
                </CategoryFeatureText>
                <CategoryFeatureLink
                  isExternal={true}
                  href="https://docs.amplify.aws/"
                >
                  {'Sub JTBD name'}
                </CategoryFeatureLink>
                <CategoryFeatureText>
                  {
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
                  }
                </CategoryFeatureText>
                <CategoryFeatureLink
                  isExternal={true}
                  href="https://docs.amplify.aws/"
                >
                  {'Sub JTBD name'}
                </CategoryFeatureLink>
                <CategoryFeatureText>
                  {
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
                  }
                </CategoryFeatureText>
              </CategoryFeature>
              <CategoryFeature category="Functions">
                <CategoryFeatureLink
                  isExternal
                  href="https://docs.amplify.aws/"
                >
                  {'Sub JTBD name'}
                </CategoryFeatureLink>
                <CategoryFeatureText>
                  {
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
                  }
                </CategoryFeatureText>
                <CategoryFeatureLink
                  isExternal
                  href="https://docs.amplify.aws/"
                >
                  {'Sub JTBD name'}
                </CategoryFeatureLink>
                <CategoryFeatureText>
                  {
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
                  }
                </CategoryFeatureText>
                <CategoryFeatureLink
                  isExternal
                  href="https://docs.amplify.aws/"
                >
                  {'Sub JTBD name'}
                </CategoryFeatureLink>
                <CategoryFeatureText>
                  {
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
                  }
                </CategoryFeatureText>
              </CategoryFeature>
            </PlatformFeatures>
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

        {/* Need to comment this to test without right navbar for new design */}
        {/* <TableOfContents
          title={title}
          ref={contentsRef}
          buttonsRef={buttonsRef}
        >
          {headers}
        </TableOfContents> */}
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
