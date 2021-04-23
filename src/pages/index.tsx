import Hero from "../components/Hero";
import LandingHeroCTA from "../components/LandingHeroCTA";

const Page = () => {
  return (
    <Hero>
      <h1>Amplify Framework Documentation</h1>
      <p>
        Learn how to use Amplify to develop and deploy cloud-powered mobile and
        web apps
      </p>

      <LandingHeroCTA />
    </Hero>
  );
};

export default Page;
