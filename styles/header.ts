import styled from 'styled-components'

export const Container = styled.header`
  position: fixed;
  width: 100%;
  z-index: 9;
`

export const Inner = styled.div`
  width: 1200px;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  margin: 1rem auto;
  padding: 0.5rem 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
`

export const Logo = styled.h2`
  a {
  }
`

export const Nav = styled.div`
  display: flex;
`

export const Item = styled.div`
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  a {
  }
  &:last-child {
    padding-right: 0;
  }
`
export const SwitchMode = styled.button`
  height: 24px;
  border-radius: 5px;
  border: none;
  padding: 0 0.5rem;
  cursor: pointer;
  transition: 0.4s ease;
`
