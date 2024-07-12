import { createTheme } from '@aws-amplify/ui-react';
import { baseTheme } from './baseTheme';

export const gen2Theme = createTheme(
  {
    name: 'gen2-theme',
    tokens: {
      colors: {
        primary: {
          10: { value: '{colors.purple.10}' },
          20: { value: '{colors.purple.20}' },
          40: { value: '{colors.purple.40}' },
          60: { value: '{colors.purple.60}' },
          80: { value: '{colors.purple.80}' },
          90: { value: '{colors.purple.90}' },
          100: { value: '{colors.purple.100}' }
        }
      }
    }
  },
  baseTheme
);
