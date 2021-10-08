import {Grid} from "theme-ui";
import Head from "next/head";
import {useEffect} from "react";

import Hero from "../components/Hero";
import LandingHeroCTA from "../components/LandingHeroCTA";
import {Container} from "../components/Container";
import {Card, CardDetail, CardGraphic} from "../components/Card";
import FeaturesGrid from "../components/FeaturesGrid";
import LinkBanner from "../components/LinkBanner";
import Footer from "../components/Footer";
import UniversalNav from "../components/UniversalNav";

import {track, trackPageVisit, AnalyticsEventType} from "../utils/track";

const meta = {
  title: "Amplify Framework Docs",
  description:
    "Amplify Framework documentation - Learn how to use Amplify to develop and deploy cloud-powered mobile and web apps.",
  url: "https://docs.amplify.aws/",
};

const Page = () => {
  useEffect(() => {
    track({
      type: AnalyticsEventType.PAGE_VISIT,
      attributes: {
        url: "/",
        previousUrl: document.referrer,
        referrer: document.referrer,
      },
    });
    trackPageVisit();
  }, []);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} key="og:title" />
        <meta name="description" content={meta.description} />
        <meta
          property="og:description"
          content={meta.description}
          key="og:description"
        />
        <meta property="og:url" content={meta.url} key="og:url" />
        <meta
          property="og:image"
          content="https://docs.amplify.aws/assets/ogp.jpg"
          key="og:image"
        />
        <meta
          property="description"
          content={meta.description}
          key="description"
        />
        <meta property="twitter:card" content="summary" key="twitter:card" />
        <meta
          property="twitter:title"
          content={meta.title}
          key="twitter:title"
        />
        <meta
          property="twitter:description"
          content={meta.description}
          key="twitter:description"
        />
        <meta
          property="twitter:image"
          content="https://docs.amplify.aws/assets/ogp.jpg"
          key="twitter:image"
        />
      </Head>
      <UniversalNav
        heading="Amplify Docs"
        brandIcon="/assets/logo-dark.svg"
        blend={true}
      />
      <Hero>
        <h1 className="font-weight-300">Amplify Framework Documentation</h1>
        <p>
          Learn how to use Amplify to develop and deploy cloud-powered mobile
          and web apps
        </p>
        <LandingHeroCTA />
      </Hero>

      <Container backgroundColor="color-off-white">
        <div className="padding-top-lg padding-bottom-lg padding-horizontal-md">
          <h4 className="text-align-center">
            Discover the end-to-end AWS solution for mobile and front-end web
            developers
          </h4>

          <Grid
            columns={[1, null, null, 4]}
            gap={4}
            sx={{
              marginTop: "2rem",
            }}
          >
            <Card href="/lib/q/platform/js">
              <CardGraphic alt="Libraries icon" src="/assets/lib.png" />
              <CardDetail>
                <h4>Amplify Libraries</h4>
                <p>
                  Connect app to new or existing AWS services (Cognito, S3, and
                  more).
                </p>
              </CardDetail>
            </Card>
            <Card href="/cli">
              <CardGraphic alt="CLI icon" src="/assets/cli.png" />
              <CardDetail>
                <h4>Amplify CLI</h4>
                <p>Configure an app backend with a guided CLI workflow.</p>
              </CardDetail>
            </Card>
            <Card href="/console">
              <CardGraphic alt="Console icon" src="/assets/console.png" />
              <CardDetail>
                <h4>Amplify Console</h4>
                <p>
                  AWS service for creating an app backend and hosting full-stack
                  web apps.
                </p>
              </CardDetail>
            </Card>
            <Card href="/console/adminui/intro">
              <CardGraphic alt="Admin UI icon" src="/assets/console.png" />
              <CardDetail>
                <h4>NEW! Amplify Admin UI</h4>
                <p>Visually configure and manage your app backend.</p>
              </CardDetail>
            </Card>
          </Grid>
        </div>
      </Container>

      <FeaturesGrid />
      <LinkBanner />
      <Footer />
    </>
  );
};

export default Page;
