module.exports = function preToCodeBlock(preProps) {
  if (
    preProps.children &&
    preProps.children.props &&
    preProps.children.type === 'code'
  ) {
    const { title, highlight } = preProps;
    const { children, className } = preProps.children.props;
    return {
      title,
      highlight,
      codeString: children.trim(),
      language: className && className.split('-')[1]
    };
  }
  return undefined;
};
