import Link from 'next/link';
import { Heading } from '@aws-amplify/ui-react';
import slug from '@/utils/slug';

export const MDXHeading = (props) => {
  const { level, children } = props;
  const href = `#${slug(children)}`;
  return (
    <Heading level={level} id={slug(children)}>
      {/* Only output heading links for h2 and h3 */}
      {level == 2 || level == 3 ? (
        <Link href={href}>{children}</Link>
      ) : (
        children
      )}
    </Heading>
  );
};
