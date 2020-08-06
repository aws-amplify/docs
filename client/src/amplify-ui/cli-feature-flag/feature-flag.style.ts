import {css} from "emotion";

export const hostStyle = css`
  amplify-feature-flags {
    margin-top: 0;
  }
`;

export const tableContainer = css`
  overflow-x: auto;
  margin-bottom: 1rem;
`;

export const tableStyle = css`
  text-align: center;
  width: 100%;

  thead tr {
    background-color: var(--bg-color-tertiary);
  }
  tbody tr th {
    width: 5rem;
  }
`;

export const tableHeaderStyle = css`
  font-size: 1rem;
  margin: 0.75rem 0;
`;

export const summaryRow = css`
  th {
    min-width: 16%;
    width: 16%;
  }
`;

export const valueCell = css`
  min-width: 9rem;
  width: 9rem;
`;

export const descriptionCell = css`
  text-align: left;
`;

export const projectCell = css`
  min-width: 6rem;
  width: 6rem;
`;
