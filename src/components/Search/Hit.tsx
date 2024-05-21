import React from 'react';
import { Text } from '@aws-amplify/ui-react';
export const Hit = ({ hit }) => {
  console.log(hit);
  const { hierarchy, url_without_anchor, anchor, _snippetResult } = hit;
  const snippet = _snippetResult ? _snippetResult.content.value : '';
  return (
    <>
      <Text as="div" fontSize="small">
        {hierarchy.lvl0}
      </Text>
      <a
        href={`${url_without_anchor}${anchor !== 'pageMain' ? `#${anchor}` : ''}`}
      >
        <div dangerouslySetInnerHTML={{ __html: snippet }} />
        <Text as="span" fontSize="small">
          {hierarchy.lvl1}
        </Text>
      </a>
    </>
  );
};
