import { createTheme } from '@aws-amplify/ui-react';

export const baseTheme = createTheme({
  name: 'base-theme',
  tokens: {
    colors: {
      blue: {
        10: { value: 'hsl(207, 76%, 90%)' }
      },
      neutral: {
        100: { value: 'hsl(213, 28%, 19%)' } // Amazon Squid Ink
      },
      purple: {
        10: { value: 'hsl(252, 100%, 98%);)' },
        20: { value: 'hsl(258, 41%, 84%);' },
        40: { value: 'hsl(258, 41%, 64%);' },
        60: { value: 'hsl(258, 41%, 44%);' },
        80: { value: 'hsl(258, 41%, 34%);' },
        90: { value: 'hsl(258, 41%, 24%);' },
        100: { value: 'hsl(258, 41%, 15%);' }
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
    fonts: {
      default: {
        variable: { value: 'Amazon Ember, sans-serif' },
        static: { value: 'Amazon Ember, sans-serif' }
      }
    },
    components: {
      button: {
        borderRadius: { value: '{radii.medium}' },
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
  }
});
