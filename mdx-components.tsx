import * as React from 'react';
import type { MDXComponents } from 'mdx/types';
import ExportedImage from 'next-image-export-optimizer';
import { AIBanner } from './src/components/legacy/AIBanner';
import InlineFilter from './src/components/InlineFilter';
import { YoutubeEmbed } from './src/components/legacy/YoutubeEmbed';
import { Accordion } from './src/components/legacy/Accordion';
import { Block, BlockSwitcher } from './src/components/legacy/BlockSwitcher';
import { Callout } from './src/components/Callout';
import Fragments from './src/components/Fragments';
import {
  MDXCode,
  MDXHeading,
  MDXLink,
  MDXTable
} from './src/components/MDXComponents';
import { MigrationAlert } from './src/components/legacy/MigrationAlert';
import preToCodeBlock from './src/utils/pre-to-code-block';
import { Overview } from './src/components/Overview';
import ExternalLink from './src/components/ExternalLink';
import { ExternalLinkButton } from './src/components/ExternalLinkButton';
import { InternalLinkButton } from './src/components/InternalLinkButton';
import { Grid, View } from '@aws-amplify/ui-react';
import { Columns } from './src/components/Columns';
import { Video } from './src/components/legacy/Video';
import { ReferencePage } from './src/components/legacy/ApiDocs';

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
    table: MDXTable,

    // Make common custom components available to content authors
    Accordion,
    Block,
    BlockSwitcher,
    Callout,
    Fragments,
    InlineFilter,
    MigrationAlert,
    YoutubeEmbed,
    AIBanner,
    Overview,
    ExternalLink,
    ExternalLinkButton,
    InternalLinkButton,
    Grid,
    Columns,
    Video,
    View,
    ReferencePage,
    ...components
  };
}
