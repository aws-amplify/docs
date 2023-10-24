import { useRef, useState, createElement, useEffect } from 'react';
import { trackExpanderOpen } from '../../utils/track';
import { IconExpand, IconChevron } from '@/components/Icons';
import {
  View,
  Flex,
  Button,
  Link,
  Text,
  VisuallyHidden
} from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';

type AccordionProps = {
  title?: string;
  headingLevel?: '2' | '3' | '4' | '5' | '6';
  eyebrow?: string;
  children?: React.ReactNode;
};

export const Accordion: React.FC<AccordionProps> = ({
  title,
  headingLevel,
  eyebrow,
  children
}) => {
  const [initialHeight, setInitialHeight] = useState<number>(0);
  const [expandedHeight, setExpandedHeight] = useState<number>(0);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const path = useRouter().asPath;
  const headingId = title?.replace(/\s+/g, '-').toLowerCase();
  const headingHref = path + headingId;
  const headingEl: React.ElementType = headingLevel
    ? `h${headingLevel}`
    : 'div';
  const isLinkableHeading = ['h2', 'h3'].includes(headingEl);

  useEffect(() => {
    const details = detailsRef.current;
    const summary = summaryRef.current;
    if (summary && details) {
      const initHeight = summary.offsetHeight;
      const expHeight = getHiddenHeight(details);

      setInitialHeight(initHeight);
      setExpandedHeight(expHeight);
    }
  }, [detailsRef, summaryRef, initialHeight, expandedHeight]);

  function getHiddenHeight(el) {
    if (!el?.cloneNode) {
      return null;
    }

    const clone = el.cloneNode(true);
    clone.setAttribute('open', '');
    el.after(clone);
    const height = clone.offsetHeight;
    clone.remove();
    return height;
  }

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
    duration: 700,
    iterations: 1
  };

  const closeAccordion = () => {
    const expander = detailsRef.current;
    if (expander) {
      const scrollToLoc = expander.offsetTop - 48 - 70 - 10; // account for nav heights and 10px buffer

      expander.animate(collapse, animationTiming);
      window.scrollTo({
        left: 0,
        top: scrollToLoc,
        behavior: 'smooth'
      });
      setTimeout(function () {
        expander.removeAttribute('open');
      }, 700);
    }
  };

  const toggleAccordion = (e) => {
    e.preventDefault();

    const expander = detailsRef.current;
    // Close accordion
    if (expander?.hasAttribute('open')) {
      expander?.animate(collapse, animationTiming);
      setTimeout(function () {
        expander.removeAttribute('open');
      }, 700);
    } else {
      // Open accordion
      trackExpanderOpen(expander?.id.replace('-acc', ''));
      expander?.setAttribute('open', '');
      expander?.animate(expand, animationTiming);
    }
  };

  return (
    <View
      as="details"
      id={headingId + '-acc'}
      className="accordion"
      ref={detailsRef}
    >
      <Flex
        as="summary"
        id="accordion__summary"
        className="accordion__summary"
        ref={summaryRef}
        onClick={toggleAccordion}
      >
        <Flex className="accordion__summary__inner">
          <Flex className="accordion__eyebrow">
            <IconExpand />
            <Text as="span">{eyebrow}</Text>
          </Flex>
          <View as={headingEl}>
            {isLinkableHeading ? (
              <Link href={headingHref}>{title}</Link>
            ) : (
              title
            )}
          </View>
        </Flex>
        <IconChevron className="accordion__chevron" />
      </Flex>
      <View id="accordion__body" className="accordion__body">
        {children}
      </View>

      <Button
        id="accordion__body__button"
        className="accordion__body__button"
        onClick={closeAccordion}
      >
        <IconChevron />
      </Button>
    </View>
  );
};
