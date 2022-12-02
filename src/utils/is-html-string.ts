const regex = /<(?<tag>[^>]*)>/;

/**
 * Verifies whether the string is an HTML string
 * @param str string to check
 */
export const isHtmlString = (str: string): boolean => {
  // <code>hello world</code> -> true
  // hello <code>world</code> -> true
  // hello world -> false
  return regex.test(str);
};

/**
 * Verifies whether the string is an HTML inline code block string
 * @param str string to check
 */
export const isHtmlCodeTagString = (str: string): boolean => {
  const result = regex.exec(str);
  return result?.groups?.tag === 'code';
};
