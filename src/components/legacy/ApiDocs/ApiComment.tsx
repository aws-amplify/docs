import { Fragment } from 'react';
import { View } from '@aws-amplify/ui-react';
import { parseMarkdownLinks, parseMarkdown } from '@/utils/parseMdxLinks';

interface ApiCommentProps {
  apiComment?: any[];
  codeBlock?: boolean | undefined;
}

export const ApiComment = ({ apiComment, codeBlock }: ApiCommentProps) => {
  if (!apiComment) return null;
  const firstItem = apiComment[0];
  if (!firstItem?.text?.replaceAll('-', '')?.trim()) {
    apiComment.shift();
  }
  const commentList = apiComment.map((snippet, idx) => {
    if (snippet.kind === 'code') {
      return <code key={idx}>{snippet.text.replaceAll('`', '')}</code>;
    } else {
      const text = snippet.text;
      if (idx === 0 && codeBlock) {
        const words = text.split(' ');
        return (
          <Fragment key={`snippet-${idx}`}>
            <code>{words[0]}</code>
            {words.slice(1).join(' ')}
          </Fragment>
        );
      } else {
        return parseMarkdownLinks(text);
      }
    }
  });

  const parsedComments = parseMarkdown(commentList as (string | JSX.Element)[]);

  return <View>{parsedComments}</View>;
};
