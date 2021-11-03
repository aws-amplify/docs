import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

import {MQFablet, MQDesktop} from "../media";

type CardProps = {
  className?: string;
  href?: string;
  external?: boolean;
};

const ExternalLinkGraphic = styled.img`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 0.75rem;
  z-index: 1;
`;

const Anchor = styled.a`
  position: relative;
`;

const docsCard: React.FC<CardProps> = ({
  children,
  className,
  href,
  external,
}) => {
  if (!href) return <div className={className}>{children}</div>;
  return (
    <Link href={href} passHref={true}>
      <Anchor>
        {external && (
          <ExternalLinkGraphic
            src="/assets/external-link-black.svg"
            alt="External link"
          />
        )}
        <div className={className}>{children}</div>
      </Anchor>
    </Link>
  );
};

export const Card = styled(docsCard)`
  position: relative;
  display: flex;
  background-color: var(--bg-color);
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100%;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.09) 0.3125rem 0.3125rem 0 -0.0625rem,
    0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.15);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

  ${MQFablet} {
    padding: 2rem 1.5rem;
  }

  ${MQDesktop} {
    padding: 2rem 2.5rem;
  }

  &:hover {
    box-shadow: 0 0.375rem 0 -0.0625rem rgba(0, 0, 0, 0.1),
      0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.1);
    transform: translateY(-0.125rem);
  }
  &:active {
    box-shadow: 0rem 0.2rem 0 -0.025rem rgba(0, 0, 0, 0.2),
      0 0.0625rem 0.125rem 0 rgba(0, 0, 0, 0.2);
    transform: translateY(0);
  }

  &.vertical {
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    padding: 2.5rem;
    height: 180px;

    img {
      margin-right: 0;
      text-align: center;
      margin-bottom: 0.5rem;
      height: 3rem;
    }

    img:hover {
      opacity: 0.8;
    }

    div {
      justify-content: center;
    }
  }

  a {
    &:hover,
    & h2:hover,
    & h3:hover {
      text-decoration: none;
    }
  }

  h4 {
    color: var(--font-color);
  }

  p {
    margin-top: 0.25em;
    color: var(--font-color-secondary);
    font-size: 0.875rem;
  }

  p:hover,
  h4:hover {
    opacity: 0.8;
  }

  * {
    cursor: pointer;
  }
`;

export const CardDetail = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;

  > h4 {
    color: var(--font-color);
  }

  > p {
    margin-top: 0.25em;
    color: var(--font-color-secondary);
    font-size: 0.875rem;
  }

  p:hover,
  h4:hover {
    opacity: 0.8;
  }
`;

export const CardGraphic = styled.img`
  margin-right: 0.75rem;
  width: 3rem;
  min-width: 3rem;
  margin-top: -6px;
  align-self: center;

  img:hover {
    opacity: 0.8;
  }
`;
