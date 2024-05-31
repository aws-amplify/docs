import { MDXCode } from '../MDXComponents';

export const ReferenceExample = ({ text, language }) => {
  return <MDXCode codeString={text} language={language} />;
};
