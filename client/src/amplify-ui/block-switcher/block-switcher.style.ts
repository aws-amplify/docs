import {css} from "emotion";

export const hostStyle = css`
  display: block;
  margin-bottom: 1.5rem;
  /* color: var(--code-font-color); */
  border-radius: 0.25rem;

  amplify-code-block {
    /* border-top-right-radius: 0;
    border-top-left-radius: 0; */
    margin-top: 0;
  }
`;

export const tabStyle = css`
  /* color: var(--code-font-color); */
  border-top-right-radius: 0.25rem;
  border-top-left-radius: 0.25rem;
  height: 100%;
  appearance: none;
  background-color: transparent;
  padding: 0.75rem 1.125rem;
  cursor: pointer;
  font-size: 0.875rem;

  border: 0.0625rem solid var(--border-color);
  border-bottom: 0;
  border-left: 0;
  /* margin-bottom: 0.25rem; */
  &:first-child {
    border-left: 0.0625rem solid var(--border-color);
  }
  box-sizing: border-box;

  &:hover {
    background-color: var(--bg-color-hover);
  }
`;

export const activeTabStyle = css`
  font-weight: 600;
  line-height: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 0.25rem solid var(--amplify-primary-color);
`;

export const tabContainerStyle = css`
  border-top-right-radius: 0.25rem;
  border-top-left-radius: 0.25rem;
`;

export const contentStyle = css`
  padding: 1rem;
  border: 0.0625rem solid var(--border-color);
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;

  > amplify-block {
    display: none;
    > pre:last-child {
      margin-bottom: 0;
    }
  }
`;
