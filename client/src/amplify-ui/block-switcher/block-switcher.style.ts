import {css} from "emotion";

export const hostStyle = css`
  display: block;
  margin-bottom: 1.5rem;
  background-color: white;
  border: 0.0625rem solid var(--border-color);
  border-radius: 0.25rem;
  > pre {
    display: none;
  }

  amplify-code-block {
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
  border-bottom: 0.0625rem solid var(--border-color);
`;

export const contentStyle = css`
  padding: 1rem;
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;

  > amplify-block {
    display: none;
    > pre:last-child {
      margin-bottom: 0;
    }
  }
`;
