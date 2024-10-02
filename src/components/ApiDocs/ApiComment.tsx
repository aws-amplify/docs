import { Fragment } from 'react';
import { View } from '@aws-amplify/ui-react';
import { parseMarkdownLinks, parseMarkdown } from '@/utils/parseMdxLinks';
import { MDXCode } from '../MDXComponents';

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
      if (snippet.text.indexOf('```') !== -1) {
        // If the comment contains a code block extract the language and render an MDXCode component
        let text = snippet.text;
        const regex = /(?<=```)([^\n```]*)/;
        const lang = text.match(regex)[0];
        if (lang) {
          text = text.replaceAll('```' + lang, '').replaceAll('```', '');
        }
        return (
          <MDXCode
            key={idx}
            codeString={text}
            showLineNumbers={false}
            language={lang}
          />
        );
      }
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
