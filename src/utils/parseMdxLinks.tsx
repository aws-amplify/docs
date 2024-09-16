import { MDXLink } from '@/components/MDXComponents';

type stringOrJSXArray = (string | JSX.Element)[];

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
