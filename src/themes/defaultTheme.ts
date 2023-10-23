import { Theme } from '@aws-amplify/ui-react';

export const defaultTheme: Theme = {
  name: 'default-theme',
  tokens: {
    colors: {
      blue: {
        10: { value: 'hsl(207, 76%, 90%)' }
      },
      neutral: {
        100: { value: 'hsl(213, 28%, 19%)' } // Amazon Squid Ink
      },
      teal: {
        10: { value: 'hsl(175, 44%, 96%)' },
        20: { value: 'hsl(175, 57%, 80%)' },
        40: { value: 'hsl(175, 57%, 70%)' },
        60: { value: 'hsl(175, 57%, 40%)' },
        80: { value: 'hsl(181, 69%, 28%)' },
        90: { value: 'hsl(181, 69%, 21%)' },
        100: { value: 'hsl(181, 69%, 15%)' }
      }
    },
    fontSizes: {
      xxl: { value: '1.8rem' },
      xxxl: { value: '2.0rem' }
    },
    components: {
      button: {
        borderRadius: { value: '{radii.large}' },
        borderWidth: { value: '{borderWidths.medium}' },
        borderColor: { value: '{colors.brand.primary.80}' },
        backgroundColor: { value: '{colors.background.primary}' },
        color: { value: '{colors.brand.primary.80}' },
        _focus: {
          borderColor: { value: 'transparent' },
          boxShadow: {
            value: '0 0 0 2px var(--amplify-colors-border-focus)'
          }
        },
        primary: {
          color: { value: '{colors.font.primary}' },
          backgroundColor: { value: '{colors.brand.primary.40}' },
          _active: {
            backgroundColor: { value: '{colors.brand.primary.10}' },
            color: { value: '{colors.font.primary}' }
          },
          _focus: {
            backgroundColor: { value: '{colors.brand.primary.20}' },
            color: { value: '{colors.font.primary}' },
            boxShadow: {
              value: '0 0 0 2px var(--amplify-colors-border-focus)'
            }
          },
          _hover: {
            backgroundColor: { value: '{colors.brand.primary.20}' },
            color: { value: '{colors.font.primary}' }
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
      message: {
        paddingBlock: { value: '{space.large}' },
        paddingInline: { value: '{space.large}' },
        borderRadius: { value: '{radii.small}' },
        filled: {
          info: {
            color: { value: '{colors.font.primary}' }
          }
        }
      }
    }
  }
};
