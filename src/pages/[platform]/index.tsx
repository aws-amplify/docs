import { getCustomStaticPath } from '@/utils/getCustomStaticPath';
import { FRAMEWORK_DISPLAY_NAMES } from '@/data/frameworks';

export const meta = {
  title: `Overview`,
  description: `This is a description for the overview page.`,
  platforms: ['javascript', 'android']
};

export const getStaticPaths = async () => {
  return getCustomStaticPath(meta.platforms);
};

export function getStaticProps(context) {
  return {
    props: {
      platform: context.params.platform,
      meta
    }
  };
}

const PlatformOverview = ({ platform }) => {
  console.log(platform);
  return <h1>// Amplify docs for {FRAMEWORK_DISPLAY_NAMES[platform]}</h1>;
};

export default PlatformOverview;
