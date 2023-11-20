module.exports = function preToCodeBlock(preProps) {
  if (
    preProps.children &&
    preProps.children.props &&
    preProps.children.type === 'code'
  ) {
    const { title } = preProps;
    const { children, className } = preProps.children.props;
    return {
      fileName: title,
      codeString: children.trim(),
      language: className && className.split('-')[1]
    };
  }
  return undefined;
};
