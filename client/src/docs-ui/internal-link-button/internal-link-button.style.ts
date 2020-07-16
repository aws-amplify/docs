import {css} from "emotion";
import {MQFablet} from "../../amplify-ui/styles/media";

export const hostStyle = css`
  display: block;
  margin-bottom: 1.5rem;
`;

export const containerStyle = css`
  a {
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: center;
    align-items: center;
    background-color: var(--color-orange-hv);
    padding: 0.675rem;
    border-radius: 0.25rem;
    color: var(--color-white);
    font-weight: 700;
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
    appearance: none;

    ${MQFablet} {
      max-width: 18rem;
    }

    &:hover {
      text-decoration: none;
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.5);
    }
  }
`;

export const graphicStyle = css`
  position: relative;
  top: 0.125rem;
  margin-right: 0.5rem;

  img {
    max-width: 1rem;
    max-height: 1rem;
  }
`;
