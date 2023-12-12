import type { PrismTheme } from 'prism-react-renderer';
export const theme: PrismTheme = {
  plain: {
    color: '#d6deeb',
    backgroundColor: 'var(--amplify-colors-neutral-100)'
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
        color: 'var(--amplify-colors-red-40)',
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
        color: 'var(--code-theme-comment)',
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
        color: 'var(--amplify-colors-font-inverse)'
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
        color: 'var(--amplify-colors-brand-primary-20)'
      }
    },
    {
      types: ['boolean'],
      style: {
        color: 'var(--amplify-colors-red-40)'
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
