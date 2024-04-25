import Link from 'next/link';
import { Heading } from '@aws-amplify/ui-react';
import slug from './utils/slug';

export const MDXHeading = (props) => {
  const { level, children } = props;
  let href = '';

  /* Test if children element is not a string before creating the url slug */
  if (children && typeof children != 'string') {
    let newChildren = '';
    /* Test if child element is a single object */
    if (typeof children == 'object' && children.props?.children) {
      newChildren = children.props.children;
    } else {
      /* If not a single object, we expect an array of
      elements and loop through them */
      for (let i = 0; i < children.length; i++) {
        if (typeof children[i] == 'string') {
          newChildren = newChildren + children[i];
        } else {
          newChildren = newChildren + children[i].props.children;
        }
      }
    }
    href = `${slug(newChildren)}`;
  } else {
    /* If children element is a string, use that to create the url slug */
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
