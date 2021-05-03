import {Grid} from "theme-ui";

import Hero from "../components/Hero";
import LandingHeroCTA from "../components/LandingHeroCTA";
import Container from "../components/Container";
import Card, {CardDetail, CardGraphic} from "../components/Card";

const Page = () => {
  return (
    <>
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
        </div>
        <Grid columns={4}>
          <Card>
            <CardGraphic src="/lib.png" />
            <CardDetail>
              <h4>Amplify Libraries</h4>
              <p>
                Connect app to new or existing AWS services (Cognito, S3, and
                more).
              </p>
            </CardDetail>
          </Card>
          <Card>
            <CardGraphic src="/cli.png" />
            <CardDetail>
              <h4>Amplify CLI</h4>
              <p>Configure an app backend with a guided CLI workflow.</p>
            </CardDetail>
          </Card>
          <Card>
            <CardGraphic src="/console.png" />
            <CardDetail>
              <h4>Amplify Console</h4>
              <p>
                AWS service for creating an app backend and hosting full-stack
                web apps.
              </p>
            </CardDetail>
          </Card>
          <Card>
            <CardGraphic src="/console.png" />
            <CardDetail>
              <h4>NEW! Amplify Admin UI</h4>
              <p>Visually configure and manage your app backend.</p>
            </CardDetail>
          </Card>
        </Grid>
      </Container>

      <Container backgroundColor="color-off-white">
        <h4 className="text-align-center">Explore Features</h4>
      </Container>
    </>
  );
};

export default Page;
