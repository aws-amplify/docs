import {css} from "emotion";
import {MQTablet} from "../../amplify-ui/styles/media";

export const discordChatStyle = css`
  display: none;
  position: fixed;
  right: 1rem;
  bottom: 0;
  background-color: var(--color-orange-hv);
  font-size: 0.875rem;
  border-top-right-radius: 0.25rem;
  border-top-left-radius: 0.25rem;

  ${MQTablet} {
    display: flex;
  }

  &:hover {
    background-color: var(--color-orange-md);
  }

  a {
    display: flex;
    color: var(--font-color-contrast);
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0.675rem;
  }
`;

export const logoStyle = css`
  height: 1.5rem;
  margin-right: 0.5rem;
`;
