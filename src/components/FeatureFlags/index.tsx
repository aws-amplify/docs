import { Fragment } from 'react';
import { Heading, Text } from '@aws-amplify/ui-react';
import Link from 'next/link';

import featureFlagsJson from './feature-flags.json';
import FeatureFlagSummary from './FeatureFlagSummary';

export type FeatureFlags = Record<string, Section>;

export type Section = {
  description: string;
  features: Record<string, FeatureFlag>;
};

export type FeatureFlag = {
  description: string;
  type: 'Feature' | 'Release' | 'Experimental';
  valueType: 'Boolean' | 'Number' | 'String';
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
    <>
      {Object.entries(data).map(([name, section], index) => {
        return (
          <Fragment key={`feature-flag-${index}`}>
            <Heading level={2} id={name}>
              <Link href={'#' + name}>{name}</Link>
            </Heading>
            {section.description ? (
              <Text>{section.description}</Text>
            ) : undefined}

            {Object.entries(section.features).map(([flagName, flag], index) => {
              return (
                <FeatureFlagSummary
                  key={`feature-flag-summary-${index}`}
                  name={flagName}
                  feature={flag}
                />
              );
            })}
          </Fragment>
        );
      })}
    </>
  );
}
