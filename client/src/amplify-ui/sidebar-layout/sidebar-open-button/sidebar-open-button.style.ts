import {css} from "emotion";
import {MQTablet} from "../../styles/media";

export const sidebarOpenButtonStyle = css`
  width: 2.75rem;
  margin-top: 1.875rem;
  padding: 0.75rem;
  position: absolute;

  border-top: 0.0625rem solid var(--border-color);
  border-right: 0.0625rem solid var(--border-color);
  border-bottom: 0.0625rem solid var(--border-color);
  border-radius: 0 0.3125rem 0.3125rem 0;
  box-shadow: rgba(0, 0, 0, 0.09) 0.08rem 0.15625rem 0 0.08rem;

  background-color: var(--bg-color);
  &:hover {
    background-color: var(--bg-color-hover);
    cursor: pointer;
  }

  display: none;
  ${MQTablet} {
    display: initial;
  }

  > a > img {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
