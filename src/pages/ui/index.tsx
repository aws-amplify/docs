import styled from "@emotion/styled";

import Layout from "../../components/Layout";
import {Grid} from "theme-ui";
import {Card, CardDetail, CardGraphic} from "../../components/Card";
import {Container} from "../../components/Container";

const H1 = styled.h1`
  margin-top: 0.375rem;
  line-height: normal;
  margin-bottom: 0;
  font-size: 1rem;
  text-transform: uppercase;
  color: var(--font-color-secondary);
  font-weight: bold;
`;

const H2 = styled.h2`
  margin-top: 0.375rem;
  font-size: 2.215rem;
  line-height: 2.75rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
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
          <section>
            <H2>Amplify UI Components</H2>

            <Grid
              columns={[1, null, null, 4]}
              gap={3}
              sx={{
                marginTop: "1rem",
              }}
            >
              <Card className="vertical" href="/ui/q/framework/react">
                <CardGraphic src="/assets/integrations/react.svg" />
                <CardDetail>
                  <h4>React</h4>
                </CardDetail>
              </Card>
              <Card className="vertical" href="/ui/q/framework/react-native">
                <CardGraphic src="/assets/integrations/react-native.svg" />
                <CardDetail>
                  <h4>React Native</h4>
                </CardDetail>
              </Card>
              <Card className="vertical" href="/ui/q/framework/angular">
                <CardGraphic src="/assets/integrations/angular.svg" />
                <CardDetail>
                  <h4>Angular</h4>
                </CardDetail>
              </Card>
              <Card className="vertical" href="/ui/q/framework/vue">
                <CardGraphic src="/assets/integrations/vue.svg" />
                <CardDetail>
                  <h4>Vue</h4>
                </CardDetail>
              </Card>
              <Card className="vertical" href="/ui/q/framework/ionic">
                <CardGraphic src="/assets/integrations/ionic.svg" />
                <CardDetail>
                  <h4>ionic</h4>
                </CardDetail>
              </Card>
              <Card className="vertical" href="/ui/q/framework/next">
                <CardGraphic src="/assets/integrations/next.svg" />
                <CardDetail>
                  <h4>Next.js</h4>
                </CardDetail>
              </Card>
            </Grid>
          </section>
        </InnerContainer>
      </Container>
    </Layout>
  );
}
