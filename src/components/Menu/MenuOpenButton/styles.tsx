import styled from "@emotion/styled";
import {MQTablet} from "../../media";

// top: 5.25rem because secondary nav is 3.375rem tall.
// `top` - `margin-top` needs to equal `secondary-nav` height.
export const MenuOpenButtonStyle = styled.button`
  position: sticky;
  top: 5.25rem;
  height: 100%;
  margin-top: 1.875rem;
  margin-right: -3rem;
  padding: 0.75rem;
  background-color: var(--bg-color);

  border-top: 0.0625rem solid var(--border-color);
  border-right: 0.0625rem solid var(--border-color);
  border-bottom: 0.0625rem solid var(--border-color);
  border-radius: 0 0.3125rem 0.3125rem 0;
  box-shadow: rgba(0, 0, 0, 0.09) 0.08rem 0.15625rem 0 0.08rem;

  &:hover {
    cursor: pointer;
    background-color: var(--bg-color-hover);
  }

  display: none;
  ${MQTablet} {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > img {
    width: 1.5rem;
    height: 1rem;
  }
`;
