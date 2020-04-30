import {css} from "emotion";

export const hostStyle = css`
  display: block;
  margin-bottom: 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: 0.25rem;
  > pre {
    display: none;
  }

  amplify-code-block {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    margin-top: 0;
  }
`;

export const activeTabStyle = css`
  font-weight: 700;
  border-bottom: 0.25rem solid var(--amplify-primary-color);
`;

export const tabStyle = css`
  border-top-right-radius: 0.25rem;
  border-top-left-radius: 0.25rem;
  height: 100%;
  appearance: none;
  background-color: transparent;
  padding: 0.75rem 1rem 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
`;

export const tabContainerStyle = css`
  border-top-right-radius: 0.25rem;
  border-top-left-radius: 0.25rem;
`;
