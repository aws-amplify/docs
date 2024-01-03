import type {
  LineInputProps,
  LineOutputProps,
  Token,
  TokenInputProps,
  TokenOutputProps
} from 'prism-react-renderer';

export interface MDXCodeProps {
  /**
   * @desc string of code to show in the code block
   */
  codeString: string;

  /**
   * @desc language of code
   */
  language?: string;

  /**
   * @desc shows as a title above the code. markdown users can
   * use ```js title="some title" to add a fileName
   */
  title?: string;

  /**
   * @desc show line numbers
   */
  showLineNumbers?: boolean;

  /**
   * @desc header id for testing
   */
  testHeaderId?: string;

  /**
   * @desc id for testing
   */
  testId?: string;
}

export interface TokenListProps {
  showLineNumbers?: boolean;
  tokens: Token[][];
  getLineProps: (input: LineInputProps) => LineOutputProps;
  getTokenProps: (input: TokenInputProps) => TokenOutputProps;
}
