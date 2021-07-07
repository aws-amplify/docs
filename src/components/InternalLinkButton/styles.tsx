import styled from "@emotion/styled";
import {MQFablet} from "../media";

export const Host = styled.div`
  display: block;
  margin-bottom: 1.5rem;
  margin-top: 2.5rem;
`;

export const Container = styled.a`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: var(--color-orange-hv);
  padding: 0.675rem;
  border-radius: 0.25rem;
  font-weight: 700;
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  appearance: none;
  cursor: pointer;
  margin: 0 auto;
  color: #fff;

  ${MQFablet} {
    max-width: 18rem;
  }

  &:hover {
    color: #fff;
    text-decoration: none;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.5);
  }

  * {
    color: var(--color-white);
    cursor: pointer;
  }
`;

export const Graphic = styled.div`
  position: relative;
  top: 0.125rem;
  margin-right: 0.5rem;

  img {
    max-width: 1rem;
    max-height: 1rem;
  }
`;
