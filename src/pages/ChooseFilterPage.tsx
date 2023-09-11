import Layout from '../components/Layout';
import styled from '@emotion/styled';
import { Grid } from '@theme-ui/components';
import { useEffect, useRef, useState } from 'react';
import MetaContent from '../components/Page/metaContent';
import { Container } from '../components/Container';
import { Card, CardDetail, CardGraphic } from '../components/Card';
import {
  filterOptionsByName,
  filterMetadataByOption
} from '../utils/filter-data';
import {
  getChapterDirectory,
  getProductDirectory,
  isProductRoot
} from '../utils/getLocalDirectory';

const H3 = styled.h3`
  margin-top: 0.375rem;
  font-size: 1.715rem;
  line-height: 2.75rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
`;

function ChooseFilterPage({
  directoryPath,
  address,
  filterKind,
  filters = [],
  currentFilter = 'all',
  message = ''
}) {
  // "url" cannot be a CFP prop for legacy reasons
  let url = address;
  const [_, setHref] = useState('https://docs.amplify.aws');
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const footerRef = useRef(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setHref(window.location.href);

    setIsMounted(true);
  }, []);

  if (!url) {
    return <></>;
  }

  url = url.split('/q/')[0];

  let title = '',
    chapterTitle = '';
  if (isProductRoot(url)) {
    title = (getProductDirectory(url) as {
      productRoot: { title: string };
    }).productRoot.title;
  } else {
    const chapterDirectory = getChapterDirectory(url);
    if (typeof chapterDirectory !== 'undefined') {
      const { title: cTitle, items } = chapterDirectory as {
        title: string;
        items: { route: string; title: string }[];
      };
      chapterTitle = cTitle;
      for (const item of items) {
        if (item.route === url) title = item.title;
      }
    }
  }

  if (filters.length === 0) filters = filterOptionsByName[filterKind];

  const children = (
    <Container>
      <section>
        {message && <H3>{message}</H3>}

        <Grid
          columns={[1, null, null, 4]}
          gap={3}
          sx={{
            marginTop: '1rem'
          }}
        >
          {filters.map((filter) => (
            <Card
              className="vertical"
              href={`${url}/q/${filterKind}/${filter}`}
              key={filter}
            >
              <CardGraphic
                alt={filterMetadataByOption[filter].label + ' icon'}
                src={filterMetadataByOption[filter].graphicURI}
              />
              <CardDetail>
                <h4>{filterMetadataByOption[filter].label}</h4>
              </CardDetail>
            </Card>
          ))}
        </Grid>
      </section>
    </Container>
  );
  return isMounted ? (
    <Layout
      meta={{
        title:
          chapterTitle === ''
            ? `${title} - Choose a platform`
            : `${chapterTitle} - ${title} - Choose a platform`,
        chapterTitle: '',
        description: `Selection page for ${title}`
      }}
      ref={footerRef}
    >
      <MetaContent
        title={title}
        chapterTitle={chapterTitle}
        headers={[]}
        children={children}
        filters={filters}
        filterKey={currentFilter}
        filterKind={filterKind}
        url={url}
        directoryPath={directoryPath}
        parentPageLastUpdatedDate=""
        footerRef={footerRef}
      />
    </Layout>
  ) : null;
}

ChooseFilterPage.getInitialProps = (initialProps) => {
  return initialProps.query;
};
export default ChooseFilterPage;
