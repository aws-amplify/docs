import { View } from '@aws-amplify/ui-react';
import ExternalLink from '../../ExternalLink';
import React from 'react';

function createEditLink(directoryPath) {
  const safePath = directoryPath
    .split('/')
    .map(encodeURIComponent)
    .join('/');
  return `https://github.com/aws-amplify/docs/edit/main/src/pages${safePath}/index.mdx`;
}

export default function RepoActions({ menuHref }) {
  const directoryPath = menuHref.pathname;
  const shouldShowEditLink = directoryPath !== '/ChooseFilterPage';
  const editLink = createEditLink(directoryPath);
  return (
    <View>
      {shouldShowEditLink && (
        <ExternalLink href={editLink}>
          <img src="/assets/github.svg" alt="" width="24" height="24" />
          <span aria-label="Edit this page on GitHub">Edit on GitHub</span>
        </ExternalLink>
      )}
    </View>
  );
}
