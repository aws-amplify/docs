import { defaultTheme } from '@aws-amplify/ui-react';

export const theme = {
  ...defaultTheme,
  name: 'contributor',
  tokens: {
    colors: {
      brand: {
        squidInk: { value: '#232F3E' },
        anchor: { value: '#003181' },
        sky: { value: '#2074d5' },
        rind: { value: '#fbd8bf' },
        smile: { value: '#ff9900' },
        darkSquidInk: { value: '#161E2D' },
        stone: { value: '#d4dada ' },
        paper: { value: 'f1f3f3' }
      }
    }
  }
};
