import {Grid} from "theme-ui";

import Hero from "../components/Hero";
import LandingHeroCTA from "../components/LandingHeroCTA";
import {Container} from "../components/Container";
import {Card, CardDetail, CardGraphic} from "../components/Card";
import LinkBanner from "../components/LinkBanner";

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
        <Grid columns={[1, null, null, 4]}>
          <Card href="/lib/q/platform/js">
            <CardGraphic src="/lib.png" />
            <CardDetail>
              <h4>Amplify Libraries</h4>
              <p>
                Connect app to new or existing AWS services (Cognito, S3, and
                more).
              </p>
            </CardDetail>
          </Card>
          <Card href="/cli">
            <CardGraphic src="/cli.png" />
            <CardDetail>
              <h4>Amplify CLI</h4>
              <p>Configure an app backend with a guided CLI workflow.</p>
            </CardDetail>
          </Card>
          <Card href="/console">
            <CardGraphic src="/console.png" />
            <CardDetail>
              <h4>Amplify Console</h4>
              <p>
                AWS service for creating an app backend and hosting full-stack
                web apps.
              </p>
            </CardDetail>
          </Card>
          <Card href="/console/adminui/intro">
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
        <Grid gap={2} columns={[1, null, null, 3]} className="margin-top-lg">
          <Card href="/lib/auth/getting-started" className="border-radius">
            <CardGraphic src="/features/auth.svg" />
            <CardDetail>
              <h4>Authentication</h4>
              <p>
                Enable sign-in, sign-up and sign-out within minutes with
                pre-built UI components and powerful authentication APIs
              </p>
            </CardDetail>
          </Card>
          <Card href="/lib/storage/getting-started" className="border-radius">
            <CardGraphic src="/features/storage.svg" />
            <CardDetail>
              <h4>Storage</h4>
              <p>
                A simple mechanism for managing user content in public,
                protected or private storage
              </p>
            </CardDetail>
          </Card>
          <Card
            href="/lib/graphqlapi/getting-started"
            className="border-radius"
          >
            <CardGraphic src="/features/api.svg" />
            <CardDetail>
              <h4>GraphQL API</h4>
              <p>
                Easy and secure solution to access your backend data with
                support for real-time updates using GraphQL
              </p>
            </CardDetail>
          </Card>
          <Card href="/lib/datastore/getting-started" className="border-radius">
            <CardGraphic src="/features/datastore.svg" />
            <CardDetail>
              <h4>DataStore</h4>
              <p>
                Seamlessly synchronize and persist online & offline data to the
                cloud as well as across devices
              </p>
            </CardDetail>
          </Card>
          <Card href="/lib/restapi/getting-started" className="border-radius">
            <CardGraphic src="/features/api.svg" />
            <CardDetail>
              <h4>REST API</h4>
              <p>
                A straightforward and secure solution for making HTTP requests
                using REST APIs
              </p>
            </CardDetail>
          </Card>
          <Card href="/lib/analytics/getting-started" className="border-radius">
            <CardGraphic src="/features/analytics.svg" />
            <CardDetail>
              <h4>Analytics</h4>
              <p>
                Make informed decisions with drop-in analytics to track user
                sessions, custom user attributes and in-app metrics
              </p>
            </CardDetail>
          </Card>
          <Card
            href="/lib/push-notifications/getting-started"
            className="border-radius"
          >
            <CardGraphic src="/features/push-notifications.svg" />
            <CardDetail>
              <h4>Push Notifications</h4>
              <p>
                Drive customer engagement using push notifications with campaign
                analytics and targeting
              </p>
            </CardDetail>
          </Card>
          <Card href="/lib/xr/getting-started" className="border-radius">
            <CardGraphic src="/features/xr.svg" />
            <CardDetail>
              <h4>XR</h4>
              <p>
                Engage your customers in a different dimension with augmented
                reality (AR) and virtual reality (VR) content within your app
              </p>
            </CardDetail>
          </Card>
          <Card href="/lib/pubsub/getting-started" className="border-radius">
            <CardGraphic src="/features/pubsub.svg" />
            <CardDetail>
              <h4>PubSub</h4>
              <p>
                Provide best-in-class real-time experiences by connecting your
                application with a message-oriented middleware in the cloud
              </p>
            </CardDetail>
          </Card>
          <Card
            href="/lib/interactions/getting-started"
            className="border-radius"
          >
            <CardGraphic src="/features/interactions.svg" />
            <CardDetail>
              <h4>Interactions</h4>
              <p>
                Automate customer workflows by enlisting the help of
                conversational chatbots powered by deep learning technologies
              </p>
            </CardDetail>
          </Card>
          <Card
            href="/lib/predictions/getting-started"
            className="border-radius"
          >
            <CardGraphic src="/features/predictions.svg" />
            <CardDetail>
              <h4>AI / ML Predictions</h4>
              <p>
                Design delightful experiences with the power of AI and ML
                functionality such as computer vision, translation,
                transcription and more
              </p>
            </CardDetail>
          </Card>
        </Grid>
      </Container>
      <LinkBanner />
    </>
  );
};

export default Page;
