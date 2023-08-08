import { Grid } from 'theme-ui';

import { Container } from '../Container';
import { Card, CardDetail, CardGraphic } from '../Card';

export default function FeaturesGrid() {
  return (
    <Container backgroundColor="color-off-white">
      <div className="padding-bottom-lg padding-top-lg padding-horizontal-md">
        <h4 className="text-align-center">Explore Features</h4>
        <Grid
          gap={4}
          columns={[1, null, null, 3]}
          sx={{
            marginTop: '2rem'
          }}
        >
          <Card href="/lib/auth/getting-started" className="border-radius">
            <CardGraphic alt="" src="/assets/features/auth.svg" />
            <CardDetail>
              <h4>Authentication</h4>
              <p>
                Enable sign-in, sign-up and sign-out within minutes with
                pre-built UI components and powerful authentication APIs
              </p>
            </CardDetail>
          </Card>
          <Card href="/lib/storage/getting-started" className="border-radius">
            <CardGraphic alt="" src="/assets/features/storage.svg" />
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
            <CardGraphic alt="" src="/assets/features/api.svg" />
            <CardDetail>
              <h4>GraphQL API</h4>
              <p>
                Easy and secure solution to access your backend data with
                support for real-time updates using GraphQL
              </p>
            </CardDetail>
          </Card>
          <Card href="/lib/datastore/getting-started" className="border-radius">
            <CardGraphic alt="" src="/assets/features/datastore.svg" />
            <CardDetail>
              <h4>DataStore</h4>
              <p>
                Seamlessly synchronize and persist online & offline data to the
                cloud as well as across devices
              </p>
            </CardDetail>
          </Card>
          <Card href="/lib/geo/getting-started" className="border-radius">
            <CardGraphic alt="" src="/assets/features/geo.svg" />
            <CardDetail>
              <h4>Geo</h4>
              <p>
                Modern, interactive maps with location markers and location
                search.
              </p>
            </CardDetail>
          </Card>
          <Card href="/lib/restapi/getting-started" className="border-radius">
            <CardGraphic alt="" src="/assets/features/api.svg" />
            <CardDetail>
              <h4>REST API</h4>
              <p>
                A straightforward and secure solution for making HTTP requests
                using REST APIs
              </p>
            </CardDetail>
          </Card>
          <Card href="/lib/analytics/getting-started" className="border-radius">
            <CardGraphic alt="" src="/assets/features/analytics.svg" />
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
            <CardGraphic alt="" src="/assets/features/push-notifications.svg" />
            <CardDetail>
              <h4>Push Notifications</h4>
              <p>
                Drive customer engagement using push notifications with campaign
                analytics and targeting
              </p>
            </CardDetail>
          </Card>
          <Card href="/lib/pubsub/getting-started" className="border-radius">
            <CardGraphic alt="" src="/assets/features/pubsub.svg" />
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
            <CardGraphic alt="" src="/assets/features/interactions.svg" />
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
            <CardGraphic alt="" src="/assets/features/predictions.svg" />
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
      </div>
    </Container>
  );
}
