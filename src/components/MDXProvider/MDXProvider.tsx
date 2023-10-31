import { Layout } from '../Layout';
import { MDXProvider as StockMDXProvider } from '@mdx-js/react';
import { getCustomStaticPath } from '@/utils/getCustomStaticPath';
import type { PropsWithChildren } from 'react';

/** @todo find other reference and remove */
type Platforms = 'javascript' | 'android' | 'swift';

type Frontmatter = {
  title: string;
  description: string;
  platforms: Platforms[];
};

type MDXWrapperProps = PropsWithChildren<{
  frontmatter: Frontmatter;
}>;

const wrapper = ({ children, frontmatter }: MDXWrapperProps) => {
  console.log('mdx page props', { props: { frontmatter } });
  return <Layout frontmatter={frontmatter}>{children}</Layout>;
};

const shortcodes = {
  wrapper
};

type MDXProviderProps = PropsWithChildren<{}>;

export function MDXProvider({ children }: MDXProviderProps) {
  return (
    <StockMDXProvider components={shortcodes}>{children}</StockMDXProvider>
  );
}
