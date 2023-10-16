import { Theme } from '@aws-amplify/ui-react';

export const defaultTheme: Theme = {
  name: 'default-theme',
  tokens: {
    colors: {
      neutral: {
        100: { value: 'hsl(213, 28%, 19%)' } // Amazon Squid Ink
      },
      teal: {
        40: { value: 'hsl(175, 57%, 70%)' }
      }
    },
    components: {
      button: {
        borderRadius: { value: '{radii.large}' },
        primary: {
          color: { value: '{colors.font.primary}' },
          backgroundColor: { value: '{colors.brand.primary.40}' }
        }
      }
    }
  }
};
