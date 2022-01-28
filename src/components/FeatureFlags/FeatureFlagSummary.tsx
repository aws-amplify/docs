// eslint-disable-next-line @typescript-eslint/no-var-requires
import getElementTop from "../../utils/get-element-top";
import FeatureFlagValues from "./FeatureFlagValues";
import InternalLink from "../InternalLink";

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

export const SummaryRow = styled.tr`
  th {
    min-width: 16%;
    width: 16%;
  }
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

export default function FeatureFlagSummary({name, feature}) {
  return (
    <div>
      <InternalLink href={"#" + name}>
        <a
          onClick={() => {
            setTimeout(scroll.bind(undefined, name), 50);
            return false;
          }}
        >
          <h3 id={name}>{name}</h3>
        </a>
      </InternalLink>

      {feature.description ? <p>{feature.description}</p> : undefined}
      <TableContainer>
        <Table>
          <thead>
            <SummaryRow>
              <th>Type</th>
              <th>Added</th>
              <th>Deprecation date</th>
              <th>Deprecated</th>
              <th>Removal date</th>
              <th>Removed</th>
            </SummaryRow>
          </thead>
          <tbody>
            <tr>
              <td>{feature.type}</td>
              <td>{feature.versionAdded}</td>
              <td>{feature.deprecationDate}</td>
              <td>{feature.versionDeprecated}</td>
              <td>{feature.removalDate}</td>
              <td>{feature.versionRemoved}</td>
            </tr>
          </tbody>
        </Table>
      </TableContainer>

      <FeatureFlagValues values={feature.values} />
    </div>
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
