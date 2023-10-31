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
  const shouldShowEditLink = path.path !== '/ChooseFilterPage';
  console.log(directoryPath);
  const editLink = createEditLink(directoryPath);
  return (
    <Flex className="repo-actions">
      {shouldShowEditLink && (
        <ExternalLink href={editLink}>
          <Flex aria-label="Edit this page on GitHub">Edit on GitHub</Flex>
          <IconPencil></IconPencil>
        </ExternalLink>
      )}
    </Flex>
  );
}
