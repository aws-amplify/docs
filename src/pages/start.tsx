import styled from "@emotion/styled";

import Layout from "../components/Layout";
import {Grid} from "theme-ui";
import {Card, CardDetail, CardGraphic} from "../components/Card";
import {Container} from "../components/Container";

const H3 = styled.h3`
  display: block;
  border-bottom: 0.125rem solid var(--border-color);
  padding: 1rem 0;
  margin-bottom: 1rem;
`;

const H4 = styled.h4`
  display: block;
`;

const InnerContainer = styled.div`
  display: block;
  padding: 2rem 4rem 4rem 4rem;
`;

export default function Page() {
  return (
    <Layout>
      <Container>
        <InnerContainer>
          <h1 className="page-heading">Getting started</h1>
          <h2>Choose a platform or framework</h2>

          <section>
            <H3>Web</H3>

            <Grid
              columns={[1, null, null, 5]}
              gap={3}
              sx={{
                marginTop: "1rem",
              }}
            >
              <Card href="/start/q/integration/js">
                <CardGraphic src="/assets/integrations/js.svg" />
                <CardDetail>
                  <H4>JavaScript</H4>
                </CardDetail>
              </Card>
              <Card href="/start/q/integration/react">
                <CardGraphic src="/assets/integrations/react.svg" />
                <CardDetail>
                  <H4>React</H4>
                </CardDetail>
              </Card>
              <Card href="/start/q/integration/angular">
                <CardGraphic src="/assets/integrations/angular.svg" />
                <CardDetail>
                  <H4>Angular</H4>
                </CardDetail>
              </Card>
              <Card href="/start/q/integration/vue">
                <CardGraphic src="/assets/integrations/vue.svg" />
                <CardDetail>
                  <H4>Vue</H4>
                </CardDetail>
              </Card>
              <Card href="/start/q/integration/next">
                <CardGraphic src="/assets/integrations/next.svg" />
                <CardDetail>
                  <H4>Next.js</H4>
                </CardDetail>
              </Card>
            </Grid>
          </section>

          <section>
            <H3>Mobile</H3>

            <Grid
              columns={[1, null, null, 5]}
              gap={3}
              sx={{
                marginTop: "1rem",
              }}
            >
              <Card href="/start/q/integration/andorid">
                <CardGraphic src="/assets/integrations/android.svg" />
                <CardDetail>
                  <H4>Android</H4>
                </CardDetail>
              </Card>
              <Card href="/start/q/integration/ios">
                <CardGraphic src="/assets/integrations/ios.svg" />
                <CardDetail>
                  <H4>iOS</H4>
                </CardDetail>
              </Card>
              <Card href="/start/q/integration/react-native">
                <CardGraphic src="/assets/integrations/react-native.svg" />
                <CardDetail>
                  <H4>React Native</H4>
                </CardDetail>
              </Card>

              <Card href="/start/q/integration/ionic">
                <CardGraphic src="/assets/integrations/ionic.svg" />
                <CardDetail>
                  <H4>Ionic</H4>
                </CardDetail>
              </Card>

              <Card href="/start/q/integration/flutter">
                <CardGraphic src="/assets/integrations/flutter.svg" />
                <CardDetail>
                  <H4>Flutter</H4>
                </CardDetail>
              </Card>
            </Grid>
          </section>
        </InnerContainer>
      </Container>
    </Layout>
  );
}
