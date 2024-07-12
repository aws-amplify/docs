import { createTheme } from '@aws-amplify/ui-react';
import { blue, neutral, purple, teal } from './colors';
import { darkModeOverride } from './darkMode';

export const baseTheme = createTheme({
  name: 'base-theme',
  tokens: {
    colors: {
      blue,
      neutral,
      purple,
      teal
    },
    fontSizes: {
      medium: { value: '1rem' },
      large: { value: '1.2rem' },
      xl: { value: '1.4rem' },
      xxl: { value: '1.5rem' },
      xxxl: { value: '1.8rem' },
      xxxxl: { value: '2.4rem' }
    },
    fonts: {
      default: {
        variable: { value: 'Amazon Ember, sans-serif' },
        static: { value: 'Amazon Ember, sans-serif' }
      }
    },
    components: {
      button: {
        borderRadius: { value: '{radii.medium}' },
        borderColor: { value: '{colors.primary.80}' },
        backgroundColor: { value: '{colors.background.primary}' },
        color: { value: '{colors.primary.80}' },
        _focus: {
          borderColor: { value: 'transparent' },
          boxShadow: {
            value: '0 0 0 2px var(--amplify-colors-border-focus)'
          }
        },
        link: {
          _focus: {
            boxShadow: {
              value: '0 0 0 2px var(--amplify-colors-border-focus)'
            }
          }
        },
        large: {
          paddingInlineStart: { value: '{space.xl.value}' },
          paddingInlineEnd: { value: '{space.xl.value}' }
        }
      },
      card: {
        padding: { value: '{space.large}' },
        outlined: {
          borderColor: { value: '{colors.neutral.40}' },
          borderRadius: { value: '{radii.large}' }
        }
      },
      heading: {
        1: {
          fontWeight: '400'
        },
        2: {
          fontWeight: '700'
        },
        3: {
          fontWeight: '700'
        }
      },
      message: {
        paddingBlock: { value: '{space.large}' },
        paddingInline: { value: '{space.large}' },
        borderRadius: { value: '{radii.small}' },
        filled: {
          info: {
            color: { value: '{colors.font.primary}' }
          }
        }
      },
      table: {
        header: {
          padding: { value: '{space.small}' }
        },
        data: {
          padding: { value: '{space.small}' }
        }
      }
    }
  },
  overrides: [darkModeOverride]
});
