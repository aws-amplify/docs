import { LATEST_AMPLIFY_DOCS_URL } from '@/data/latestAmplify';

export const LatestAmplifyBanner = () => {
  return (
    <div className="latest-amplify-banner">
      <span className="latest-amplify-banner__badge">New</span>
      <span className="latest-amplify-banner__text">
        Deploy web apps with Git or your AI coding agent using the latest AWS Amplify. Add managed databases and authentication as you grow. {" "}
        <a
          href={LATEST_AMPLIFY_DOCS_URL}
          className="latest-amplify-banner__link"
        >
          Explore the documentation
        </a>
        .
      </span>
    </div>
  );
};
