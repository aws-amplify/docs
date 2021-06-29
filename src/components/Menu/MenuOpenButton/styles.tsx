import styled from "@emotion/styled";
import {MQTablet} from "../../media";

// top: 4.375rem because secondary nav is 3.375rem tall.
// `top` - `margin-top` needs to equal `secondary-nav` height.
export const MenuOpenButtonStyle = styled.button`
  position: sticky;
  top: 4.375rem;
  width: 2.75rem;
  height: 100%;
  margin-top: 1rem;
  margin-right: 0.75rem;
  padding: 0.75rem;
  background-color: var(--amplify-background-color);

  border-top: 0.0625rem solid var(--border-color);
  border-right: 0.0625rem solid var(--border-color);
  border-bottom: 0.0625rem solid var(--border-color);
  border-radius: 0 0.3125rem 0.3125rem 0;
  box-shadow: rgba(0, 0, 0, 0.09) 0.08rem 0.15625rem 0 0.08rem;

  &:hover {
    cursor: pointer;
  }

  display: none;
  ${MQTablet} {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > a > img {
    width: 1.5rem;
    height: 1.5rem;
    float: right;
  }
`;
