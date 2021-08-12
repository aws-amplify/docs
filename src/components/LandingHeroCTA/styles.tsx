import styled from "@emotion/styled";
import {MQFablet} from "../media";

export const PlatformsGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  ${MQFablet} {
    a {
      padding: 0 1.25rem;
    }
  }
`;

export const CTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2.5rem;
  width: 100%;
`;
