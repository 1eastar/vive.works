// Original: https://github.com/sdras/night-owl-vscode-theme
// Converted automatically using ./tools/themeFromVsCode

import type { PrismTheme } from 'prism-react-renderer'

const theme: PrismTheme = {
  plain: {
    color: '#e0e6f1',
    backgroundColor: '#28292B',
  },
  styles: [
    {
      types: ['changed'],
      style: {
        color: 'rgb(162, 191, 252)',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgba(239, 83, 80, 0.56)',
      },
    },
    {
      types: ['inserted', 'attr-name', 'attr-value'],
      style: {
        color: 'rgb(173, 219, 103)',
      },
    },
    {
      types: ['attr-name', 'number'],
      style: {
        color: '#d19a66',
      },
    },
    {
      types: ['spread'],
      style: {
        color: '#56B6C2',
      },
    },
    {
      types: ['comment'],
      style: {
        color: '#7c858d',
      },
    },
    {
      types: ['string', 'url'],
      style: {
        color: 'rgb(173, 219, 103)',
      },
    },
    {
      types: ['variable'],
      style: {
        color: 'rgb(214, 222, 235)',
      },
    },
    {
      types: ['builtin', 'char', 'constant', 'function'],
      style: {
        color: '#61AFEF',
      },
    },
    {
      // This was manually added after the auto-generation
      // so that punctuations are not italicised
      types: ['punctuation'],
      style: {
        color: '#ABB2BF',
      },
    },
    {
      types: ['selector', 'doctype'],
      style: {
        color: 'rgb(199, 146, 234)',
      },
    },
    {
      types: ['class-name', 'script'],
      style: {
        color: '#E06C75',
      },
    },
    {
      types: ['tag', 'keyword'],
      style: {
        color: '#C678DD',
      },
    },
    {
      types: ['operator'],
      style: {
        color: '#98c376',
      },
    },
    {
      types: ['boolean'],
      style: {
        color: 'rgb(255, 88, 116)',
      },
    },
    {
      types: ['namespace'],
      style: {
        color: 'rgb(178, 204, 214)',
      },
    },
  ],
}

export default theme
