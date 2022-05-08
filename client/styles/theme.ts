import { createGlobalStyle } from 'styled-components'

export const lightTheme = {
  body: '#fff',
  text: '#121212',
  toggleBorder: '#fff',
  hover: '#EFEFEF',
  disabled: '#c1c1c1',
  active: '#999',
  fail: '#ff3300',
  highlight: '#60fd1e',
  hyperlink: {
    default: '#0000ee',
    contrast: '#00ee00',
    broken: '#ee0000'
  },
}

export const darkTheme = {
  body: '#121212',
  text: '#fff',
  toggleBorder: '#6B8096',
  hover: '#999',
  active: '#EFEFEF',
  disabled: '#c1c1c1',
  fail: '#ff3300',
  highlight: '#7f7fff',
  hyperlink: {
    default: '#0000ee',
    contrast: '#00ee00',
    broken: '#ee0000'
  },
}

type Theme = {
  theme: {
    body: string
    text: string
    toggleBorder: string
    hover: string
    active: string
    fail: string
  }
}

export const GlobalStyles = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
  }
  body {
      background: ${({ theme }: Theme) => theme.body};
      color: ${({ theme }: Theme) => theme.text};
      transition: all 0.50s linear;
      overflow-x: hidden;
      font-family: 'KoPubWorld-Dotum-Light';
  }
  a {
    text-decoration: none;
    color: ${({ theme }: Theme) => theme.text};
  }
`;
