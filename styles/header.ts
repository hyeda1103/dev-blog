import styled from 'styled-components'

export const Container = styled.header`
  position: fixed;
  width: 100%;
  padding: 0.5rem 0;
  background: ${({ theme }) => theme.text};
  z-index: 9;
`

export const Inner = styled.div`
  width: 960px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Logo = styled.h2`
  a {
    color: ${({ theme }) => theme.body};
  }
`

export const Nav = styled.div`
  display: flex;
`

export const Item = styled.h2`
  padding: 0 2rem;
  a {
    color: ${({ theme }) => theme.body};
  }
`
