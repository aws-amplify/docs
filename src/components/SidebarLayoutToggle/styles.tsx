import styled from "@emotion/styled";
import {MQTablet} from "../media";

type ToggleProps = {
  inView?: boolean;
};

export const Toggle = styled.div<ToggleProps>((props) => {
  return `
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 10;

    position: fixed;
    right: 1rem;
    bottom: 1rem;
    background-color: var(--color-orange-hv);
    border-radius: 50%;
    width: 3.5rem;
    height: 3.5rem;

    img {
      width: 1.5rem;
      height: 1.5rem;
    }

    .ex-graphic {
      ${props.inView ? `display: inital` : `display: none`};
    }

    .burger-graphic {
      ${props.inView ? `display: none` : `display: initial`};
    }

    ${MQTablet} {
      display: none;
    }
`;
});
