import styled from '@emotion/styled';
import { Plus, DeepDive } from './icons';

type AccordionProps = {
  title?: string;
  eyebrow?: string;
  withButton?: Boolean;
};

export const Details = styled.details`
  --border-color: var(--amplify-colors-teal-40);
  --background-color: var(--amplify-colors-teal-10);
  --background-color-hover: var(--amplify-colors-teal-20);
  --border-radius: 0.25rem;
  --padding-inline: 1.25rem;
  --padding-block: 1rem;
  --text-color: var(--amplify-colors-teal-90);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  text-align: left;

  &.with-button .docs-expander__summary {
    cursor: default;
    --background-color-hover: var(--amplify-colors-teal-10);
  }

  &[open] .docs-expander__summary {
    border-end-end-radius: 0;
    border-end-start-radius: 0;
  }

  &[open] .docs-expander__title__indicator svg {
    transform: rotate(45deg);
  }

  .docs-expander__body {
    padding-inline: var(--padding-inline);
    padding-block: var(--padding-block);
    background-color: white;
    border-top: 1px solid var(--border-color);
    border-end-end-radius: var(--border-radius);
    border-end-start-radius: var(--border-radius);
  }
`;

export const Summary = styled.summary`
  position: relative;
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  cursor: pointer;
  padding-inline: var(--padding-inline);
  padding-block: var(--padding-block);
  color: var(--text-color);
  transition: background-color 0.25s ease-in-out;
  border-radius: var(--border-radius);
  list-style: none;

  &:hover {
    cursor: pointer;
    --background-color: var(--background-color-hover);
  }

  .docs-expander__eyebrow {
    font-size: 0.625rem;
    font-weight: bold;
    text-transform: uppercase;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
  }

  .docs-expander__title {
    font-weight: bold;
    font-size: 1rem;
  }

  .docs-expander__button {
    border: none;
    appearance: none;
    background-color: var(--amplify-colors-teal-20);
    color: var(--amplify-colors-teal-90);
    font-weight: bold;
    font-size: 0.75rem;
    border-radius: var(--border-radius);
    padding-inline: 0.5rem;
    padding-block: 0.25rem;
    cursor: pointer;
  }

  .docs-expander__button:hover {
    background-color: var(--amplify-colors-teal-40);
  }

  .docs-expander__title__indicator svg {
    position: absolute;
    right: var(--padding-inline);
    width: 1rem;
    height: 1rem;
    top: 50%;
    margin-top: -0.5rem;
    transition: transform 0.25s ease-in-out;
  }
`;

const Accordion: React.FC<AccordionProps> = ({
  title,
  eyebrow,
  children,
  withButton = false
}) => {
  return (
    <Details className={`docs-expander ${withButton ? 'with-button' : ''}`}>
      <Summary className={`docs-expander__summary`}>
        <div className={`docs-expander__eyebrow`}>
          <DeepDive />
          {eyebrow}
        </div>

        <div className={`docs-expander__title`}>{title}</div>

        {/* For prototyping purposes only! */}
        {withButton ? (
          <button className="docs-expander__button">Show details</button>
        ) : (
          <div className={`docs-expander__title__indicator`}>
            <Plus />
          </div>
        )}
      </Summary>
      <div className={`docs-expander__body`}>{children}</div>
    </Details>
  );
};

export default Accordion;
