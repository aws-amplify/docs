import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  View
} from '@aws-amplify/ui-react';

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

export default function FeatureFlagValues({ values }) {
  return (
    <View className="table-wrapper">
      <Table variation="bordered" className="ff-table">
        <TableHead>
          <TableRow>
            <TableCell as="th">Value</TableCell>
            <TableCell as="th">Description</TableCell>
            <TableCell as="th">Default for existing projects</TableCell>
            <TableCell as="th">Default for new projects</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {values.map((value, index) => {
            return (
              <TableRow key={`tr-${index}`}>
                <TableCell className="ff-table__value">
                  <code>{value.value}</code>
                </TableCell>
                <TableCell className="ff-table__desc">
                  {value.description}
                </TableCell>
                <TableCell className="ff-table__default">
                  {value.defaultExistingProject ? '✅' : ''}
                </TableCell>
                <TableCell className="ff-table__default">
                  {value.defaultNewProject ? '✅' : ''}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </View>
  );
}
