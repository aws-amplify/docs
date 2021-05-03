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
        <Grid gap={2} columns={3} className="margin-top-lg">
          <Card url="~/lib/auth/getting-started.md" className="border-radius">
            <CardGraphic src="/features/auth.svg" />
            <h4 slot="heading">Authentication</h4>
            <p slot="description">
              Enable sign-in, sign-up and sign-out within minutes with pre-built
              UI components and powerful authentication APIs
            </p>
          </Card>
          <Card
            url="~/lib/storage/getting-started.md"
            className="border-radius"
          >
            <CardGraphic src="/features/storage.svg" />
            <h4 slot="heading">Storage</h4>
            <p slot="description">
              A simple mechanism for managing user content in public, protected
              or private storage
            </p>
          </Card>
          <Card
            url="~/lib/graphqlapi/getting-started.md"
            className="border-radius"
          >
            <CardGraphic src="/features/api.svg" />
            <h4 slot="heading">GraphQL API</h4>
            <p slot="description">
              {" "}
              Easy and secure solution to access your backend data with support
              for real-time updates using GraphQL{" "}
            </p>
          </Card>
          <Card
            url="~/lib/datastore/getting-started.md"
            className="border-radius"
          >
            <CardGraphic src="/features/datastore.svg" />
            <h4 slot="heading">DataStore</h4>
            <p slot="description">
              Seamlessly synchronize and persist online & offline data to the
              cloud as well as across devices
            </p>
          </Card>
          <Card
            url="~/lib/restapi/getting-started.md"
            className="border-radius"
          >
            <CardGraphic src="/features/api.svg" />
            <h4 slot="heading">REST API</h4>
            <p slot="description">
              A straightforward and secure solution for making HTTP requests
              using REST APIs
            </p>
          </Card>
          <Card
            url="~/lib/analytics/getting-started.md"
            className="border-radius"
          >
            <CardGraphic src="/features/analytics.svg" />
            <h4 slot="heading">Analytics</h4>
            <p slot="description">
              Make informed decisions with drop-in analytics to track user
              sessions, custom user attributes and in-app metrics
            </p>
          </Card>
          <Card
            url="~/lib/push-notifications/getting-started.md"
            className="border-radius"
          >
            <img
              slot="graphic"
              src="~/assets/features/push-notifications.svg"
            />
            <h4 slot="heading">Push Notifications</h4>
            <p slot="description">
              Drive customer engagement using push notifications with campaign
              analytics and targeting
            </p>
          </Card>
          <Card url="~/lib/xr/getting-started.md" className="border-radius">
            <CardGraphic src="/features/xr.svg" />
            <h4 slot="heading">XR</h4>
            <p slot="description">
              Engage your customers in a different dimension with augmented
              reality (AR) and virtual reality (VR) content within your app
            </p>
          </Card>
          <Card url="~/lib/pubsub/getting-started.md" className="border-radius">
            <CardGraphic src="/features/pubsub.svg" />
            <h4 slot="heading">PubSub</h4>
            <p slot="description">
              Provide best-in-class real-time experiences by connecting your
              application with a message-oriented middleware in the cloud
            </p>
          </Card>
          <Card
            url="~/lib/interactions/getting-started.md"
            className="border-radius"
          >
            <CardGraphic src="/features/interactions.svg" />
            <h4 slot="heading">Interactions</h4>
            <p slot="description">
              Automate customer workflows by enlisting the help of
              conversational chatbots powered by deep learning technologies
            </p>
          </Card>
          <Card
            url="~/lib/predictions/getting-started.md"
            className="border-radius"
          >
            <CardGraphic src="/features/predictions.svg" />
            <h4 slot="heading">AI / ML Predictions</h4>
            <p slot="description">
              Design delightful experiences with the power of AI and ML
              functionality such as computer vision, translation, transcription
              and more
            </p>
          </Card>
        </Grid>
      </Container>
    </>
  );
};

export default Page;
