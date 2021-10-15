// eslint-disable-next-line @typescript-eslint/no-var-requires
import getElementTop from "../../utils/get-element-top";
import featureFlagsJson from "./feature-flags.json";
import FeatureFlagSummary from "./FeatureFlagSummary";
import InternalLink from "../InternalLink";

import styled from "@emotion/styled";

const Container = styled.div`
  margin-top: 0;
`;

export type FeatureFlags = Record<string, Section>;

export type Section = {
  description: string;
  features: Record<string, FeatureFlag>;
};

export type FeatureFlag = {
  description: string;
  type: "Feature" | "Release" | "Experimental";
  valueType: "Boolean" | "Number" | "String";
  versionAdded: string;
  versionDeprecated?: string;
  deprecationDate?: string;
  versionRemoved?: string;
  removalDate?: string;
  values: Value[];
};

export type Value = {
  value: string;
  description: string;
  defaultNewProject: boolean;
  defaultExistingProject: boolean;
};

export default function FeatureFlags() {
  const data = featureFlagsJson as FeatureFlags;

  return (
    <Container>
      {Object.entries(data).map(([name, section]) => {
        return (
          <div>
            <InternalLink href={"#" + name}>
              <a
                onClick={() => {
                  setTimeout(scroll.bind(undefined, name), 50);
                  return false;
                }}
              >
                <h2 id={name}>{name}</h2>
              </a>
            </InternalLink>

            {section.description ? <p>{section.description}</p> : undefined}

            {Object.entries(section.features).map(([flagName, flag]) => {
              return <FeatureFlagSummary name={flagName} feature={flag} />;
            })}
          </div>
        );
      })}
    </Container>
  );
}

const stickyHeaderHeight = 54;
function scroll(hash) {
  const header = document.querySelector(`[id="${hash}"]`);
  const top = getElementTop(header, stickyHeaderHeight);
  if (top !== window.scrollY) {
    window.scrollTo({top});
  }
}
