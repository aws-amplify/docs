import { ThemeProvider } from '@aws-amplify/ui-react';
import { default as BaseLayout } from '../../../components/Layout';
import { theme } from './theme';
import type { PropsWithChildren } from 'react';

export type LayoutProps = PropsWithChildren<{
  // @todo use types from Layout component
  meta: {
    title: string;
    description: string;
  };
}>;

export default function Layout({ children, meta }: LayoutProps) {
  return (
    <div id="contributor-page">
      <ThemeProvider theme={theme}>
        <BaseLayout meta={meta}>{children}</BaseLayout>
      </ThemeProvider>
    </div>
  );
}
