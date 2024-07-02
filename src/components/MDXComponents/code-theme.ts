import type { PrismTheme } from 'prism-react-renderer';

/**
 * Note: Currently our code blocks are on a dark background,
 * regardless of light/dark mode, so we're not using Amplify UI
 * tokens because they flip from light to dark depending on mode.
 */
export const theme: PrismTheme = {
  plain: {
    color: '#d6deeb'
  },
  styles: [
    {
      types: ['changed'],
      style: {
        color: 'rgb(162, 191, 252)',
        fontStyle: 'italic'
      }
    },
    {
      types: ['deleted'],
      style: {
        color: 'hsl(0, 75%, 75%)',
        fontStyle: 'italic'
      }
    },
    {
      types: ['inserted', 'attr-name'],
      style: {
        color: 'rgb(173, 219, 103)',
        fontStyle: 'italic'
      }
    },
    {
      types: ['comment'],
      style: {
        color: 'hsl(210, 4%, 71%)',
        fontStyle: 'italic'
      }
    },
    {
      types: ['string', 'url'],
      style: {
        color: 'rgb(173, 219, 103)'
      }
    },
    {
      types: ['variable'],
      style: {
        color: 'hsl(0,0%,100%)'
      }
    },
    {
      types: ['number'],
      style: {
        color: 'rgb(247, 140, 108)'
      }
    },
    {
      types: ['builtin', 'char', 'constant', 'function'],
      style: {
        color: 'rgb(130, 170, 255)'
      }
    },
    {
      types: ['punctuation'],
      style: {
        color: 'rgb(199, 146, 234)'
      }
    },
    {
      types: ['selector', 'doctype'],
      style: {
        color: 'rgb(199, 146, 234)',
        fontStyle: 'italic'
      }
    },
    {
      types: ['class-name'],
      style: {
        color: 'rgb(255, 203, 139)'
      }
    },
    {
      types: ['tag', 'operator', 'keyword'],
      style: {
        color: 'hsl(175, 57%, 80%)'
      }
    },
    {
      types: ['boolean'],
      style: {
        color: 'hsl(0, 75%, 75%)'
      }
    },
    {
      types: ['property'],
      style: {
        color: 'rgb(128, 203, 196)'
      }
    },
    {
      types: ['namespace'],
      style: {
        color: 'rgb(178, 204, 214)'
      }
    }
  ]
};
export default theme;
