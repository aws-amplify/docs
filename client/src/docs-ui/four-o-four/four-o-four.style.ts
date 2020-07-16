import {css} from "emotion";
import {MQDesktop} from "../../amplify-ui/styles/media";

export const hostStyle = css`
  width: 100%;
  height: calc(100vh - 10.75rem);
  padding: 1rem;

  ${MQDesktop} {
    height: calc(100vh - 7.75rem);
  }

  > div {
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1 {
      margin-bottom: 0.5rem;
    }

    p {
      margin-bottom: 1rem;
      max-width: 32rem;
    }
  }
`;
