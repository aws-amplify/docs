import { createTheme } from '@aws-amplify/ui-react';
import { baseTheme } from './baseTheme';

export const gen1Theme = createTheme(
  {
    name: 'gen1-theme',
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
              color: { value: '{colors.font.primary}' }
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
