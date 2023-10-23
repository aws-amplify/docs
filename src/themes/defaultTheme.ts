import { createTheme } from '@aws-amplify/ui-react';
import { baseTheme } from './baseTheme';

export const defaultTheme = createTheme(
  {
    name: 'default-theme'
  },
  baseTheme
);
