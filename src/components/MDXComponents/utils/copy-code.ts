export const prepareCopyText = (codeString: string): string => {
  // We need to strip out markdown comments from the code string
  // so they don't show up in our copied text
  const highlightStartText = /\/\/\s?highlight-start/g;
  const highlightEndText = /\/\/\s?highlight-end/g;
  const highlightNextLine = /\/\/\s?highlight-next-line/g;

  return codeString
    .replace(highlightStartText, '')
    .replace(highlightEndText, '')
    .replace(highlightNextLine, '');
};
