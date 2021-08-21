import { createGlobalStyle } from 'styled-components'

export const lightTheme = {
  body: '#fff',
  text: '#363537',
  toggleBorder: '#fff',
  background: '#363537',
}

export const darkTheme = {
  body: '#363537',
  text: '#fafafa',
  toggleBorder: '#6B8096',
  background: '#999',
}

type Theme = {
  theme: {
    body: string
    text: string
    toggleBorder: string
    background: string
  }
}

export const GlobalStyles = createGlobalStyle`
    @font-face {
      font-family: 'Pretendard-Thin';
      src: url("/fonts/Pretendard-Thin.ttf");
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Pretendard-Light';
      src: url("/fonts/Pretendard-Light.ttf");
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Pretendard-Regular';
      src: url("/fonts/Pretendard-Regular.ttf");
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Pretendard-Medium';
      src: url("/fonts/Pretendard-Medium.ttf");
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Pretendard-SemiBold';
      src: url("/fonts/Pretendard-SemiBold.ttf");
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Pretendard-Bold';
      src: url("/fonts/Pretendard-Bold.ttf");
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
        font-family: 'Pretendard-Regular';
    }
    a {
      text-decoration: none;
      color: ${({ theme }: Theme) => theme.text};
    }
`
