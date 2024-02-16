import Link from 'next/link';
import { Heading } from '@aws-amplify/ui-react';
import slug from './utils/slug';

export const MDXHeading = (props) => {
  const { level, children } = props;

  let href = '';

  if (children && typeof children != 'string') {
    let newChildren = '';
    for (let i = 0; i < children.length; i++) {
      if (typeof children[i] == 'string') {
        newChildren = newChildren + children[i];
      } else if (typeof children[i] != 'string') {
        newChildren = newChildren + children[i].props.children;
      }
    }
    href = `${slug(newChildren)}`;
  } else {
    href = `${slug(children)}`;
  }

  return (
    <Heading level={level} id={href}>
      {/* Only output heading links for h2 and h3 \ */}
      {level == 2 || level == 3 ? (
        <Link href={`#${href}`}>{children}</Link>
      ) : (
        children
      )}
    </Heading>
  );
};
