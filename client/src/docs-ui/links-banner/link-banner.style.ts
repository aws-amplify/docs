import {css} from "emotion";
import {MQLaptop} from "../../amplify-ui/styles/media";

export const containerOuterStyle = css`
  padding: 2rem 1rem;
  background-color: var(--color-ink-md);
`;

export const containerInnerStyle = css`
  display: flex;
  flex-direction: column;
  flex: 1;

  ${MQLaptop} {
    flex-direction: row;
  }

  amplify-external-link,
  stencil-route-link,
  a {
    display: flex;
    flex: 1;
  }

  amplify-external-link {
    padding: 0.5rem;
  }

  a {
    background-color: var(--color-white);
    justify-content: center;
    align-items: center;
    flex-direction: row;
    color: var(--font-color);
    padding: 1rem 0;
    border-radius: 0.25rem;

    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.5);

    &:hover {
      box-shadow: 0 0.125rem 0.25rem var(--color-black);
    }
  }
`;

export const logoStyle = css`
  max-height: 1.5rem;
  max-width: 1.5rem;
  margin-right: 0.5rem;
`;
