import Link from 'next/link';
import { Heading } from '@aws-amplify/ui-react';

export const MDXHeading = (props) => {
  const { level, children, id } = props;

  return (
    <Heading level={level} id={id}>
      {/* Only output heading links for h2 and h3 \ */}
      {level == 2 || level == 3 ? (
        <Link href={`#${id}`}>{children}</Link>
      ) : (
        children
      )}
    </Heading>
  );
};
