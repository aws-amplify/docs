import { Flex, Heading, Text } from '@aws-amplify/ui-react';
import Link from 'next/link';
import flatDirectory from '@/directory/flatDirectory.json';

interface CrossReferencesProps {
  crossRefs: string[];
}

/**
 * Renders "Related" links to pages in other sections.
 * Reads route titles from flatDirectory so links display
 * human-readable names instead of raw paths.
 */
export function CrossReferences({ crossRefs }: CrossReferencesProps) {
  if (!crossRefs || crossRefs.length === 0) {
    return null;
  }

  const resolvedRefs = crossRefs
    .map((route) => {
      const entry = (flatDirectory as Record<string, { title?: string }>)[
        route
      ];
      return {
        route,
        title: entry?.title || route.split('/').filter(Boolean).pop() || route
      };
    })
    .filter((ref) => ref.route);

  if (resolvedRefs.length === 0) {
    return null;
  }

  return (
    <Flex
      as="aside"
      aria-label="Related documentation"
      className="cross-references"
      direction="column"
      gap="xs"
    >
      <Heading level={4} className="cross-references__heading">
        Related
      </Heading>
      <Flex
        as="ul"
        direction="column"
        gap="xxs"
        className="cross-references__list"
      >
        {resolvedRefs.map((ref) => (
          <Text as="li" key={ref.route} className="cross-references__item">
            <Link href={ref.route} className="cross-references__link">
              {ref.title}
            </Link>
          </Text>
        ))}
      </Flex>
    </Flex>
  );
}
