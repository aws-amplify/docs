import { MDXLink } from '@/components/MDXComponents';
import { View } from '@aws-amplify/ui-react';

type stringOrJSXArray = (string | JSX.Element)[];

export const parseMarkdown = (input: stringOrJSXArray): stringOrJSXArray => {
  const lineBreaks: stringOrJSXArray = [];
  const result: stringOrJSXArray = [];

  // look for line breaks and wrap them in a line-break View
  function parseLineBreak(inputString) {
    if (typeof inputString === 'string' && inputString.indexOf('\n\n') !== -1) {
      const parts = inputString.split('\n\n');
      parts.forEach((part, idx) => {
        if (idx < parts.length - 1) {
          lineBreaks.push(
            <View className="line-break" marginBottom="1rem">
              {part}
            </View>
          );
        } else {
          lineBreaks.push(part);
        }
      });
    } else {
      lineBreaks.push(inputString);
    }
  }

  // iterate over the array looking at each item for strings that contain \n\n and replace with line breaks
  input.forEach((item) => {
    if (Array.isArray(item)) {
      item.forEach((val) => {
        parseLineBreak(val);
      });
    } else {
      parseLineBreak(item);
    }
  });

  // look for \n- which indicates a list and create a list starting with the first \n-
  for (let i = 0; i < lineBreaks.length; i++) {
    const current = lineBreaks[i];
    if (typeof current === 'string' && current.indexOf('\n-') !== -1) {
      const parts = current.split('\n-');
      result.push(parts[0]);
      const listItems: JSX.Element[] = [];
      for (let x = 1; x < parts.length; x++) {
        if (x < parts.length - 1) {
          // not the last item in the list, add as a list item
          listItems.push(<li>{parts[x]}</li>);
        } else {
          // last item in the parts list need to continue iterating through lineBreaks to look for other list item indicators
          const currentParts: stringOrJSXArray = [parts[x]];
          for (let y = i + 1; y < lineBreaks.length; y++) {
            currentParts.push(lineBreaks[y]);
          }
          listItems.push(<li>{currentParts}</li>);
        }
      }

      const unorderedList = <ul>{listItems}</ul>;
      result.push(unorderedList);
      break;
    } else {
      result.push(current);
    }
  }

  return result;
};

export const parseMarkdownLinks = (inputString: string): stringOrJSXArray => {
  const result: stringOrJSXArray = [];
  if (!inputString) return result;
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(inputString)) !== null) {
    const [fullMatch, linkText, url] = match;

    if (!fullMatch) continue;

    // add text before the link
    if (match.index > lastIndex) {
      result.push(inputString.slice(lastIndex, match.index));
    }

    // add link
    result.push(
      <MDXLink href={url} hash="">
        {linkText}
      </MDXLink>
    );

    lastIndex = regex.lastIndex;
  }

  // Add any text found after the last link
  if (lastIndex < inputString.length) {
    result.push(inputString.slice(lastIndex));
  }

  return result;
};
