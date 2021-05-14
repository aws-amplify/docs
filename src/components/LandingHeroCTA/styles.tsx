import styled from "@emotion/styled";
import {MQFablet} from "../media";

export const PlatformsGroup = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;

  ${MQFablet} {
    a {
      padding: 0 1.25rem;
    }
  }
`;
