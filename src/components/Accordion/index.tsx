import { useRef, useState, createElement, useEffect } from 'react';
import { Details, Summary } from './styles';
import { Expand, DeepDive } from './icons';

type AccordionProps = {
  title?: string;
  headingLevel?: string;
  eyebrow?: string;
};

const Accordion: React.FC<AccordionProps> = ({
  title,
  headingLevel,
  eyebrow,
  children
}) => {
  const [closeButton, setCloseButton] = useState(true);
  const [initialHeight, setInitialHeight] = useState(0);
  const [expandedHeight, setExpandedHeight] = useState(0);
  const docsExpander = useRef<HTMLElement>(null);

  useEffect(() => {
    const expander = docsExpander.current;

    setExpandedHeight(
      expander?.children['docs-expander__summary']?.offsetHeight +
        expander?.children['docs-expander__body']?.offsetHeight
    );
    setInitialHeight(
      expander?.children['docs-expander__summary']?.offsetHeight
    );

    // if (expandedHeight > window.innerHeight) {
    // setCloseButton(true);
    // }
  }, [expandedHeight, initialHeight, closeButton]);

  const headingId = title?.replace(/\s+/g, '-').toLowerCase();
  headingLevel = headingLevel ? 'h' + headingLevel : 'div';
  const expanderTitle = createElement(
    headingLevel,
    {
      id: headingId,
      className: 'docs-expander__title'
    },
    title
  );

  const anchor = createElement(
    'a',
    { href: window.location.pathname + '#' + headingId },
    expanderTitle
  );

  const collapse = [
    {
      maxHeight: expandedHeight + 'px'
    },
    { maxHeight: initialHeight + 'px' }
  ];

  const expand = [
    { maxHeight: initialHeight + 'px' },
    {
      maxHeight: expandedHeight + 'px'
    }
  ];

  const animationTiming = {
    duration: 500,
    iterations: 1
  };

  const scrollToLoc =
    docsExpander?.current?.offsetTop - docsExpander?.current?.offsetHeight - 48;

  const closeAccordion = () => {
    docsExpander.current?.animate(collapse, animationTiming);
    window.scrollTo({
      left: 0,
      top: scrollToLoc,
      behavior: 'smooth'
    });
    setTimeout(function() {
      docsExpander.current?.removeAttribute('open');
    }, 500);
  };

  const toggleAccordion = (e) => {
    e.preventDefault();
    const expander = docsExpander.current;
    // Close accordion
    if (expander?.hasAttribute('open')) {
      expander?.animate(collapse, animationTiming);
      setTimeout(function() {
        expander.removeAttribute('open');
      }, 500);
    } else {
      // Open accordion
      expander?.setAttribute('open', '');
      expander?.animate(expand, animationTiming);
    }
  };

  return (
    <Details className="docs-expander" ref={docsExpander}>
      <Summary
        id="docs-expander__summary"
        className="docs-expander__summary"
        onClick={toggleAccordion}
      >
        <div className="docs-expander__eyebrow">
          <DeepDive />
          {eyebrow}
        </div>
        {anchor}
        <div className="docs-expander__title__indicator">
          <Expand />
        </div>
      </Summary>
      <div id="docs-expander__body" className="docs-expander__body">
        {children}
      </div>
      {closeButton ? (
        <button
          id="docs-expander__body__button"
          className="docs-expander__body__button"
          onClick={closeAccordion}
        >
          <Expand />
        </button>
      ) : null}
    </Details>
  );
};

export default Accordion;
