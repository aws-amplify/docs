import * as React from 'react';
import type { MDXComponents } from 'mdx/types';
import ExportedImage from 'next-image-export-optimizer';
import { Banner } from './src/components/Banner';
import InlineFilter from './src/components/InlineFilter';
import { YoutubeEmbed } from './src/components/YoutubeEmbed';
import { Accordion } from './src/components/Accordion';
import { Block, BlockSwitcher } from './src/components/BlockSwitcher';
import { Callout } from './src/components/Callout';
import Fragments from './src/components/Fragments';
import { MDXCode, MDXHeading, MDXLink } from './src/components/MDXComponents';
import { MigrationAlert } from './src/components/MigrationAlert';
import preToCodeBlock from './src/utils/pre-to-code-block';
import { Overview } from './src/components/Overview';
import ExternalLink from './src/components/ExternalLink';
import { ExternalLinkButton } from './src/components/ExternalLinkButton';
import { InternalLinkButton } from './src/components/InternalLinkButton';
import FilterContent from './src/components/FilterContent';
import { Grid, View } from '@aws-amplify/ui-react';
import { Columns } from './src/components/Columns';

const ResponsiveImage = (props) => (
  <ExportedImage style={{ height: 'auto' }} {...props} />
);

const MDXHeading1 = (props) => <MDXHeading level={1} {...props} />;
const MDXHeading2 = (props) => <MDXHeading level={2} {...props} />;
const MDXHeading3 = (props) => <MDXHeading level={3} {...props} />;
const MDXHeading4 = (props) => <MDXHeading level={4} {...props} />;
const MDXHeading5 = (props) => <MDXHeading level={5} {...props} />;
const MDXHeading6 = (props) => <MDXHeading level={6} {...props} />;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Map markdown elements to custom components
    a: MDXLink,
    h1: MDXHeading1,
    h2: MDXHeading2,
    h3: MDXHeading3,
    h4: MDXHeading4,
    h5: MDXHeading5,
    h6: MDXHeading6,
    pre: (preProps) => {
      const props = preToCodeBlock(preProps);
      if (props) {
        return <MDXCode {...props} />;
      }
      return <pre {...preProps} />;
    },
    img: ResponsiveImage,

    // Make common custom components available to content authors
    Accordion,
    Block,
    BlockSwitcher,
    Callout,
    Fragments,
    InlineFilter,
    MigrationAlert,
    YoutubeEmbed,
    Banner,
    Overview,
    ExternalLink,
    ExternalLinkButton,
    InternalLinkButton,
    FilterContent,
    Grid,
    Columns,
    View,
    ...components
  };
}
