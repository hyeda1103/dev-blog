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
    * {
        margin: 0;
        padding: 0;
    }
    body {
        background: ${({ theme }: Theme) => theme.body};
        color: ${({ theme }: Theme) => theme.text};
        font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
        transition: all 0.50s linear;
        overflow-x: hidden;
    }
    a {
      text-decoration: none;
    }
`
