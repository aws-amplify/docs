import FeatureFlagValues from './FeatureFlagValues';
import {
  Heading,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Text,
  View
} from '@aws-amplify/ui-react';
import Link from 'next/link';

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

export default function FeatureFlagSummary({ name, feature }) {
  return (
    <>
      <Heading level={3} id={name}>
        <Link href={'#' + name}>{name}</Link>
      </Heading>

      {feature.description ? <Text>{feature.description}</Text> : undefined}

      <View className="table-wrapper">
        <Table variation="bordered">
          <TableHead>
            <TableRow>
              <TableCell as="th">Type</TableCell>
              <TableCell as="th">Added</TableCell>
              <TableCell as="th">Deprecation date</TableCell>
              <TableCell as="th">Deprecated</TableCell>
              <TableCell as="th">Removal date</TableCell>
              <TableCell as="th">Removed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{feature.type}</TableCell>
              <TableCell>{feature.versionAdded}</TableCell>
              <TableCell>{feature.deprecationDate}</TableCell>
              <TableCell>{feature.versionDeprecated}</TableCell>
              <TableCell>{feature.removalDate}</TableCell>
              <TableCell>{feature.versionRemoved}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </View>

      <FeatureFlagValues values={feature.values} />
    </>
  );
}
