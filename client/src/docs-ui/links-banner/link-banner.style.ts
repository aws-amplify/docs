import {css} from "emotion";
import {MQLaptop} from "../../amplify-ui/styles/media";

export const containerOuterStyle = css`
  padding: 2rem 4rem;
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
  }
`;

export const logoStyle = css`
  max-height: 2rem;
  max-width: 2rem;
  margin-right: 0.5rem;
`;
