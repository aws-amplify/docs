import styled from '@emotion/styled';

export const Details = styled.details`
  --border-color: var(--amplify-colors-teal-40);
  --background-color: var(--amplify-colors-teal-10);
  --background-color-hover: var(--amplify-colors-teal-20);
  --border-radius: 0.25rem;
  --padding-inline: 1.25rem;
  --padding-block: 1rem;
  --text-color: var(--amplify-colors-teal-90);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  text-align: left;
  overflow: hidden;

  &[open] .docs-expander__summary {
    border-end-end-radius: 0;
    border-end-start-radius: 0;
  }

  &[open] .docs-expander__title__indicator svg {
    transform: rotate(-180deg);
  }

  .docs-expander__body {
    padding-inline: var(--padding-inline);
    padding-block: var(--padding-block);
    background-color: white;
    border-top: 1px solid var(--border-color);
    border-end-end-radius: var(--border-radius);
    border-end-start-radius: var(--border-radius);
  }

  .docs-expander__body__button {
    outline: none;
    width: 100%;
    border-bottom: 1px solid var(--border-color);
    background-color: var(--amplify-colors-teal-10);
    transform: rotate(-180deg);
    padding-inline: var(--padding-inline);
    padding-block: var(--padding-block);
    text-align: left;

    .amplify-icon {
      display: flex;
      align-items: center;
    }
  }

  .docs-expander__body__button:hover {
    cursor: pointer;
  }

  button.tab-active {
    border-bottom: 0.25rem solid var(--amplify-colors-teal-20);
  }
`;

export const Summary = styled.summary`
  position: relative;
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  cursor: pointer;
  padding-inline: var(--padding-inline);
  padding-block: var(--padding-block);
  color: var(--text-color);
  transition: background-color 0.25s ease-in-out;
  border-radius: var(--border-radius);
  list-style: none;

  &:hover {
    cursor: pointer;
    --background-color: var(--background-color-hover);
  }

  .docs-expander__eyebrow {
    font-size: 0.625rem;
    font-weight: bold;
    text-transform: uppercase;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;

    .amplify-icon {
      svg {
        height: unset !important;
      }
    }
  }

  .docs-expander__title {
    font-weight: bold;
    font-size: 1rem;
    margin: 0;
    color: #000;
    scroll-padding-top: 100px !important;
  }

  .docs-expander__button {
    border: none;
    appearance: none;
    background-color: var(--amplify-colors-teal-20);
    color: var(--amplify-colors-teal-90);
    font-weight: bold;
    font-size: 0.75rem;
    border-radius: var(--border-radius);
    padding-inline: 0.5rem;
    padding-block: 0.25rem;
    cursor: pointer;
  }

  .docs-expander__button:hover {
    background-color: var(--amplify-colors-teal-40);
  }

  .docs-expander__title__indicator svg {
    position: absolute;
    right: var(--padding-inline);
    top: 50%;
    margin-top: -0.5rem;
    transition: transform 0.25s ease-in-out;
  }
`;
