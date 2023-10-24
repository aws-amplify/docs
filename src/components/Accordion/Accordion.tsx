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
import classNames from 'classnames';
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
  const [initialHeight, setInitialHeight] = useState<string | number>('none');
  const [expandedHeight, setExpandedHeight] = useState<string | number>('none');
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const path = useRouter().asPath;
  const headingId = title?.replace(/\s+/g, '-').toLowerCase();
  const headingHref = path + '#' + headingId;
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
  }, [detailsRef, summaryRef]);

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
    duration: 400,
    timing: 'easeOut',
    iterations: 1
  };

  const closeAccordion = () => {
    const details = detailsRef.current;
    if (details) {
      const scrollToLoc = details.offsetTop - 48 - 70 - 10; // account for nav heights and 10px buffer
      setDetailsOpen(false);
      details.animate(collapse, animationTiming);
      window.scrollTo({
        left: 0,
        top: scrollToLoc,
        behavior: 'smooth'
      });
      setTimeout(function () {
        details.removeAttribute('open');
      }, animationTiming.duration);
    }
  };

  const toggleAccordion = (e) => {
    e.preventDefault();

    const details = detailsRef.current;
    // Close accordion
    if (details?.hasAttribute('open')) {
      setDetailsOpen(false);
      details?.animate(collapse, animationTiming);
      setTimeout(function () {
        details.removeAttribute('open');
      }, animationTiming.duration);
    } else {
      trackExpanderOpen(headingId);
      details?.setAttribute('open', '');
      details?.animate(expand, animationTiming);
      setDetailsOpen(true);
    }
  };

  return (
    <View as="details" className="accordion" ref={detailsRef}>
      <Flex
        as="summary"
        className="accordion__summary"
        ref={summaryRef}
        onClick={toggleAccordion}
      >
        <Flex className="accordion__summary__inner">
          <Flex className="accordion__eyebrow">
            <IconExpand />
            {eyebrow}
          </Flex>
          <View as={headingEl} className="accordion__heading">
            {isLinkableHeading ? (
              <Link href={headingHref} className="accordion__heading__link">
                {title}
              </Link>
            ) : (
              title
            )}
          </View>
        </Flex>
        <IconChevron
          className={classNames('accordion__chevron', {
            'icon-rotate-180-reverse': detailsOpen
          })}
        />
      </Flex>
      <View className="accordion__body">{children}</View>

      <Button className="accordion__button" onClick={closeAccordion}>
        <IconChevron
          className={classNames('accordion__chevron', {
            'icon-rotate-180-reverse': detailsOpen
          })}
        />
      </Button>
    </View>
  );
};
