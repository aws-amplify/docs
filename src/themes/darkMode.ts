import { blue, purple, neutral, teal, orange, red, yellow } from './colors';
import { ColorModeOverride } from '@aws-amplify/ui';

export const darkModeOverride: ColorModeOverride = {
  colorMode: 'dark',
  tokens: {
    colors: {
      blue: {
        10: blue[100],
        20: blue[90],
        40: blue[80],
        60: blue[60],
        80: blue[40],
        90: blue[20],
        100: blue[10]
      },
      neutral: {
        10: neutral[100],
        20: neutral[90],
        40: neutral[80],
        60: neutral[60],
        80: neutral[40],
        90: neutral[20],
        100: neutral[10]
      },
      purple: {
        10: purple[100],
        20: purple[90],
        40: purple[80],
        60: purple[60],
        80: purple[40],
        90: purple[20],
        100: purple[10]
      },
      teal: {
        10: teal[100],
        20: teal[90],
        40: teal[80],
        60: teal[60],
        80: teal[40],
        90: teal[20],
        100: teal[10]
      },
      orange: {
        10: orange[100],
        20: orange[90],
        40: orange[80],
        60: orange[60],
        80: orange[40],
        90: orange[20],
        100: orange[10]
      },
      yellow: {
        10: yellow[100],
        20: yellow[90],
        40: yellow[80],
        60: yellow[60],
        80: yellow[40],
        90: yellow[20],
        100: yellow[10]
      },
      red: {
        10: red[100],
        20: red[90],
        40: red[80],
        60: red[60],
        80: red[40],
        90: red[20],
        100: red[10]
      },
      font: {
        primary: '{colors.white}',
        secondary: '{colors.neutral.100}',
        tertiary: '{colors.neutral.90}',
        inverse: '{colors.neutral.10}',
        interactive: '{colors.primary.90}'
      },

      background: {
        primary: '{colors.neutral.10}',
        secondary: '{colors.neutral.20}',
        tertiary: '{colors.neutral.40}'
      },

      border: {
        primary: '{colors.neutral.60}',
        secondary: '{colors.neutral.40}',
        tertiary: '{colors.neutral.20}'
      },
      overlay: {
        5: 'hsla(0, 0%, 100%, 0.05)',
        10: 'hsla(0, 0%, 100%, 0.1)',
        20: 'hsla(0, 0%, 100%, 0.2)',
        30: 'hsla(0, 0%, 100%, 0.3)',
        40: 'hsla(0, 0%, 100%, 0.4)',
        50: 'hsla(0, 0%, 100%, 0.5)',
        60: 'hsla(0, 0%, 100%, 0.6)',
        70: 'hsla(0, 0%, 100%, 0.7)',
        80: 'hsla(0, 0%, 100%, 0.8)',
        90: 'hsla(0, 0%, 100%, 0.9)'
      }
    },
    components: {
      button: {
        color: { value: '{colors.white}' }
      },
      message: {
        filled: {
          info: {
            backgroundColor: { value: '{colors.blue.20}' }
          }
        }
      }
    }
  }
};
