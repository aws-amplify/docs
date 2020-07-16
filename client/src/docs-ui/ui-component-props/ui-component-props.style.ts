import {css} from "emotion";

export const tableStyle = css`
  text-align: left;
  width: 100%;
  font-size: 0.875rem;
  margin-bottom: 1rem;

  thead tr {
    background-color: var(--bg-color-tertiary);
  }
  tbody tr th {
    width: 5rem;
  }
`;

export const sectionHeaderStyle = css`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const tableHeaderStyle = css`
  font-size: 1rem;
  margin: 0.75rem 0;
`;
