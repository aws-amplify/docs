module.exports = function preToCodeBlock(preProps) {
  if (
    preProps.children &&
    preProps.children.props &&
    preProps.children.type === 'code'
  ) {
    const { title, highlight, showLineNumbers } = preProps;
    const { children, className } = preProps.children.props;
    return {
      codeString: children ? children.trim() : '',
      highlight,
      language: className && className.split('-')[1],
      showLineNumbers,
      title
    };
  }
  return undefined;
};
