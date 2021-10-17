import styled from "@emotion/styled";

export const TableContainer = styled.div`
  overflow-x: auto;
  margin-bottom: 1rem;
`;

export const Table = styled.table`
  text-align: center;
  width: 100%;

  thead tr {
    background-color: var(--bg-color-tertiary);
  }
  tbody tr th {
    width: 5rem;
  }
`;

export const Value = styled.th`
  min-width: 9rem;
  width: 9rem;
`;

export const Description = styled.th`
  text-align: left;
`;

export const Project = styled.th`
  min-width: 6rem;
  width: 6rem;
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

export default function FeatureFlagValues({values}) {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Value>Value</Value>
            <th>Description</th>
            <Project>
              Default for
              <br />
              existing projects
            </Project>
            <Project>
              Default for
              <br />
              new projects
            </Project>
          </tr>
        </thead>
        <tbody>
          {values.map((value) => {
            return (
              <tr>
                <td>
                  <code>{value.value}</code>
                </td>
                <Description>{value.description}</Description>
                <td>{value.defaultExistingProject ? "✅" : ""}</td>
                <td>{value.defaultNewProject ? "✅" : ""}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </TableContainer>
  );
}
