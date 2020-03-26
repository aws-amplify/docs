import {css} from "emotion";
import {MQTablet} from "../../amplify-ui/styles/media";

export const gitterChatStyle = css`
  display: none;
  position: fixed;
  right: 1rem;
  bottom: 0;
  background-color: var(--color-orange-hv);
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.5rem;
  text-transform: uppercase;
  font-size: 0.75rem;
  border-top-right-radius: 0.25rem;
  border-top-left-radius: 0.25rem;

  ${MQTablet} {
    display: flex;
  }

  &:hover {
    background-color: var(--color-orange-md);
  }

  a {
    color: var(--font-color-contrast);
  }
`;
