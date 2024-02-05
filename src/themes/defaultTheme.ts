import { createTheme } from '@aws-amplify/ui-react';
import { baseTheme } from './baseTheme';

export const defaultTheme = createTheme(
  {
    name: 'default-theme',
    tokens: {
      components: {
        button: {
          primary: {
            color: { value: '{colors.font.primary}' },
            backgroundColor: { value: '{colors.primary.40}' },
            _active: {
              backgroundColor: { value: '{colors.primary.10}' },
              color: { value: '{colors.font.primary}' }
            },
            _focus: {
              backgroundColor: { value: '{colors.primary.20}' },
              color: { value: '{colors.font.primary}' },
              boxShadow: {
                value: '0 0 0 2px var(--amplify-colors-border-focus)'
              }
            },
            _hover: {
              backgroundColor: { value: '{colors.primary.20}' },
              color: { value: '{colors.font.primary}' }
            }
          }
        }
      }
    }
  },
  baseTheme
);
