import React from 'react';
import { MDXProvider as StockMDXProvider } from '@mdx-js/react';
// import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import Block from './Block';
import BlockSwitcher from './BlockSwitcher';
import Callout from './Callout';
import { Card, CardDetail, CardGraphic } from './Card';
import CodeBlock from './CodeBlock';
import ExternalLink from './ExternalLink';
import Fragments from './Fragments';
import FilterContent from './FilterContent';
import InternalLink from './InternalLink';
import InternalLinkButton from './InternalLinkButton';
import Hero from './Hero';
import Footer from './Footer';
import Container from './Container';
import FeatureFlags from './FeatureFlags';
import Page from './Page';
import UiComponentProps from './UiComponentProps';
import MigrationAlert from './MigrationAlert';
import { Grid } from 'theme-ui';

const wrapper = ({ children, frontmatter }) => {
  console.log('mdx page props', { props: { frontmatter } });
  const meta = {
    chapterTitle: 'asdf',
    title: 'asdf'
  };
  //  return <Page meta={meta}>{children}</Page>;
  return <div>{children}</div>;
};

const shortcodes = {
  // AmplifyAuthenticator,
  // AmplifySignOut,
  // Block,
  // BlockSwitcher,
  Callout,
  // Card,
  // CardDetail,
  // CardGraphic,
  // CodeBlock,
  ExternalLink,
  Fragments,
  // FilterContent,
  InternalLink,
  InternalLinkButton,
  // Hero,
  // Footer,
  // Container,
  // FeatureFlags,
  // Grid,
  // MigrationAlert,
  Page
  // UiComponentProps,
  // wrapper
};

const MDXProvider = ({ children }) => {
  return (
    <StockMDXProvider components={shortcodes}>{children}</StockMDXProvider>
  );
};

export default MDXProvider;
