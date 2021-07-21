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
            <H2>Amplify Libraries</H2>

            <Grid
              columns={[1, null, null, 4]}
              gap={3}
              sx={{
                marginTop: "1rem",
              }}
            >
              <Card className="vertical" href="/lib/q/platform/js">
                <CardGraphic src="/assets/integrations/js.svg" />
                <CardDetail>
                  <h4>JavaScript</h4>
                </CardDetail>
              </Card>
              <Card className="vertical" href="/lib/q/platform/android">
                <CardGraphic src="/assets/integrations/android.svg" />
                <CardDetail>
                  <h4>Android</h4>
                </CardDetail>
              </Card>
              <Card className="vertical" href="/lib/q/platform/ios">
                <CardGraphic src="/assets/integrations/ios.svg" />
                <CardDetail>
                  <h4>iOS</h4>
                </CardDetail>
              </Card>
              <Card className="vertical" href="/lib/q/platform/flutter">
                <CardGraphic src="/assets/integrations/flutter.svg" />
                <CardDetail>
                  <h4>Flutter</h4>
                </CardDetail>
              </Card>
            </Grid>
          </section>
        </InnerContainer>
      </Container>
    </Layout>
  );
}
