import { Flex } from '@aws-amplify/ui-react';
import ExternalLink from '../../ExternalLink';
import React from 'react';
import { IconPencil } from '@/components/Icons';

function createEditLink(directoryPath) {
  const safePath = directoryPath
    .split('/')
    .map(encodeURIComponent)
    .join('/');
  return `https://github.com/aws-amplify/docs/edit/next-release/main/src/pages${safePath}/index.mdx`;
}

export default function RepoActions({ path }) {
  const shouldShowEditLink = path.pathname !== '/';
  const editLink = createEditLink(path.pathname);
  return (
    <>
      {shouldShowEditLink && (
        <Flex className="repo-actions">
          <ExternalLink href={editLink}>
            <Flex
              className="repo-actions-link"
              aria-label="Edit this page on GitHub"
            >
              <IconPencil />
              Edit on GitHub
            </Flex>
          </ExternalLink>
        </Flex>
      )}
      ;
    </>
  );
}
