import { Grid } from 'theme-ui'

import Hero from "../components/Hero";
import LandingHeroCTA from "../components/LandingHeroCTA";
import Container from "../components/Container";

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
          <h4 className="text-align-center">Discover the end-to-end AWS solution for mobile and front-end web developers</h4>
        </div>
        <Grid columns={4}>
          <p>card</p>
          <p>card</p>
          <p>card</p>
          <p>card</p>
        </Grid>
      </Container>
    </>
  );
};

export default Page;
