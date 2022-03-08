import { createGlobalStyle } from 'styled-components'

export const lightTheme = {
  body: '#fff',
  text: '#121212',
  toggleBorder: '#fff',
  hover: '#EFEFEF',
  active: '#999',
}

export const darkTheme = {
  body: '#121212',
  text: '#f2f2f2',
  toggleBorder: '#6B8096',
  hover: '#999',
  active: '#EFEFEF'
}

type Theme = {
  theme: {
    body: string
    text: string
    toggleBorder: string
    hover: string
    active: string
  }
}

export const GlobalStyles = createGlobalStyle`
    @font-face {
      font-family: 'KoPubWorld-Batang-Light';
      src: url("/fonts/KoPubWorld-Batang-Light.ttf");
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'KoPubWorld-Dotum-Light';
      src: url("/fonts/KoPubWorld-Dotum-Light.ttf");
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'KoPubWorld-Batang-Medium';
      src: url("/fonts/KoPubWorld-Batang-Medium.ttf");
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'KoPubWorld-Dotum-Medium';
      src: url("/fonts/KoPubWorld-Dotum-Medium.ttf");
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'KoPubWorld-Batang-Bold';
      src: url("/fonts/KoPubWorld-Batang-Bold.ttf");
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'KoPubWorld-Dotum-Bold';
      src: url("/fonts/KoPubWorld-Dotum-Bold.ttf");
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Gilbeot-Rainbow';
      src: url("/fonts/Gilbeot-Rainbow.ttf");
      font-style: normal;
      font-display: swap;
    }
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
`
