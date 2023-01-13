import styled from '@emotion/styled';
import featureFlagsJson from '../../data/feature-flags.json';
import FeatureFlagSummary from './FeatureFlagSummary';
import InternalLink from '../InternalLink';

const Container = styled.div`
  margin-top: 0;
`;

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
  const data = featureFlagsJson as Record<string, Section>;

  return (
    <Container>
      {Object.entries(data).map(([name, section]) => (
        <div key={name}>
          <InternalLink href={'#' + name}>
            <h3 id={name}>{name}</h3>
          </InternalLink>

          {section.description && <p>{section.description}</p>}

          {Object.entries(section.features).map(([flagName, flag]) => (
            <FeatureFlagSummary key={flagName} name={flagName} feature={flag} />
          ))}
        </div>
      ))}
    </Container>
  );
}
