import { readFile } from 'node:fs/promises';
import { useState, useEffect, Fragment } from 'react';
import {
  findDirectoryNode,
  findDirectoryNodes
} from '@/utils/findDirectoryNode';
import { getChildPageNodes } from '@/utils/getChildPageNodes';
import { Overview } from '@/components/Overview';
import { compileSync, runSync } from '@mdx-js/mdx';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import rehypeImgSize from 'rehype-img-size';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import * as runtime from 'react/jsx-runtime';
import { useMDXComponents } from '@/mdx-components';

export function getStaticPaths() {
  const nodes = findDirectoryNodes((item) => {
    return item.startsWith('src/docs');
  });

  return {
    paths: nodes.map((node) => {
      return { params: { slug: node.route.split('/').slice(1) } };
    }),
    fallback: false
  };
}

const parseMdxFile = (raw: string) => {
  const lines = raw.split('\n');
  if (lines[0] === '---') {
    lines.shift();
    while (lines[0] !== '---' && lines.length > 0) {
      lines.shift();
    }
    lines.shift();
  }
  return lines.join('\n');
};

export async function getStaticProps({ params }) {
  const { slug } = params;
  const slugPath = `/${slug.join('/')}`;
  const meta = findDirectoryNode(slugPath);
  const { title, description } = meta;
  const childPageNodes = getChildPageNodes(slugPath);
  const { path: compPath } = meta;

  const raw = await readFile(compPath, 'utf8');
  const content = parseMdxFile(raw);
  const compiled = String(
    compileSync(content, {
      outputFormat: 'function-body',
      format: 'mdx',
      providerImportSource: '@/mdx-components.tsx',
      development: false,
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [rehypeImgSize, { dir: 'public' }],
        rehypeMdxCodeProps,
        rehypeSlug
      ]
    })
  );

  return {
    props: {
      compiled,
      slug,
      ...meta,
      meta: { title, description },
      childPageNodes
    }
  };
}

export default function Page({ compiled, childPageNodes }) {
  const [mdxModule, setMdxModule] = useState();
  const Content = mdxModule ? mdxModule.default : Fragment;

  useEffect(() => {
    (async function () {
      const content = runSync(compiled, {
        ...runtime,
        baseUrl: import.meta.url,
        useMDXComponents
      });
      setMdxModule(content);
    })();
  }, [compiled]);
  return (
    <>
      <Content />
      <Overview childPageNodes={childPageNodes} />
    </>
  );
}
