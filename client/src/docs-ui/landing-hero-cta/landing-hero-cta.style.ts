import {css} from "emotion";
import {MQFablet} from "../../amplify-ui/styles/media";

export const platformsGroupStyle = css`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;

  stencil-route-link > a {
    display: block;
    padding: 0 0.25rem;
  }

  ${MQFablet} {
    stencil-route-link > a {
      padding: 0 1.25rem;
    }
  }
`;

export const platformIcon = css`
  width: 2.5rem;
  height: 2.5rem;
`;

export const buttonStyle = css`
  margin-top: 2.5rem;

  a {
    margin: 1.5rem auto 0 auto;
  }
`;
