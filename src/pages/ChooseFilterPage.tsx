import Layout from "../components/Layout";
import styled from "@emotion/styled";
import {Grid} from "@theme-ui/components";
import {useEffect, useState} from "react";
import {metaContent} from "../components/Page";
import {Container} from "../components/Container";
import {Card, CardDetail, CardGraphic} from "../components/Card";
import {
  filterOptionsByName,
  filterMetadataByOption,
} from "../utils/filter-data";
import {
  getChapterDirectory,
  getProductDirectory,
} from "../utils/getLocalDirectory";

const H2 = styled.h2`
  margin-top: 0.375rem;
  font-size: 2.215rem;
  line-height: 2.75rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
`;

const H3 = styled.h3`
  margin-top: 0.375rem;
  font-size: 1.715rem;
  line-height: 2.75rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
`;

const InnerContainer = styled.div`
  display: block;
  padding: 2rem 4rem 4rem 4rem;
`;

function ChooseFilterPage({href, filterKind, filters = [], message = ""}) {
  const [_, setHref] = useState("https://docs.amplify.aws");
  useEffect(() => {
    setHref(window.location.href);
  }, []);

  href = href.split("/q/")[0];

  let title = (getProductDirectory(href) as {productRoot: {title: string}})
    .productRoot.title;
  const chapterDirectory = getChapterDirectory(href);
  if (typeof chapterDirectory !== "undefined") {
    const {title: chapterTitle, items} = chapterDirectory as {
      title: string;
      items: {route: string; title: string}[];
    };
    title += " - " + chapterTitle;
    for (const item of items) {
      if (item.route === href) title += " - " + item.title;
    }
  }

  if (filters.length === 0) filters = filterOptionsByName[filterKind];

  const children = (
    <Container>
      <InnerContainer>
        <section>
          <H2>{title}</H2>
          {message && <H3>{message}</H3>}

          <Grid
            columns={[1, null, null, 4]}
            gap={3}
            sx={{
              marginTop: "1rem",
            }}
          >
            {filters.map((filter) => (
              <Card
                className="vertical"
                href={`${href}/q/${filterKind}/${filter}`}
                key={filter}
              >
                <CardGraphic src={filterMetadataByOption[filter].graphicURI} />
                <CardDetail>
                  <h4>{filterMetadataByOption[filter].label}</h4>
                </CardDetail>
              </Card>
            ))}
          </Grid>
        </section>
      </InnerContainer>
    </Container>
  );
  const meta = {
    title: "",
    chapterTitle: "",
    headers: [],
    children,
    filters: filters,
    filterKey: undefined,
    pathname: href,
    href: href,
  };
  return (
    <Layout
      meta={{
        title,
        chapterTitle: "",
        description: `Selection page for ${title}`,
      }}
    >
      {metaContent(meta)}
    </Layout>
  );
}

ChooseFilterPage.getInitialProps = (initialProps) => {
  return initialProps.query;
};
export default ChooseFilterPage;
