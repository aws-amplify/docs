import { View } from '@aws-amplify/ui-react';

export const ApiComment = ({ apiComment, codeBlock }) => {
  if (apiComment.length === 0) return null;
  const firstItem = apiComment[0];
  if (!firstItem.text.replaceAll('-', '').trim()) {
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
          <>
            <code>{words[0]}</code>
            {words.slice(1).join(' ')}
          </>
        );
      } else {
        return text;
      }
    }
  });

  return <View>{commentList}</View>;
};
