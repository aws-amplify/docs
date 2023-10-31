import { Flex } from '@aws-amplify/ui-react';
import ExternalLink from '../../ExternalLink';
import React from 'react';
import { IconPencil } from '@/components/Icons';

function createEditLink(directoryPath) {
  const safePath = directoryPath
    .split('/')
    .map(encodeURIComponent)
    .join('/');
  return `https://github.com/aws-amplify/docs/edit/main/src/pages${safePath}/`;
}

export default function RepoActions({ path }) {
  const directoryPath = path.path.replace('src/pages', '');
  console.log(directoryPath);
  const editLink = createEditLink(directoryPath);
  return (
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
  );
}
