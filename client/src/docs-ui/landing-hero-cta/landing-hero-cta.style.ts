import {css} from "emotion";

export const platformsGroupStyle = css`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;

  stencil-route-link > a {
    display: block;
    padding: 0 1.25rem;
  }
`;

export const platformIcon = css`
  width: 2.5rem;
`;

export const buttonStyle = css`
  display: block;
  margin-top: 2.5rem;

  > stencil-route-link > a {
    display: block;
    margin: 1.5rem auto 0 auto;
    max-width: 18rem;
    background-color: var(--color-orange-hv);
    padding: 0.675rem;
    border-radius: 0.25rem;
    color: var(--color-white);
    font-weight: 700;
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);

    &:hover {
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.5);
    }
  }
`;
