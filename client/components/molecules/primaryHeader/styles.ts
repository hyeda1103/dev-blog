import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
  display: flex;
  align-items: center;
`

export const Inner = styled.div`
  width: 840px;
  height: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Logo = styled.h3`
  a {
    font-size: 28px;
  }
`

export const Nav = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  list-style: none;
  position: relative;
`

export const Item = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 14px;
  padding: 0 2px;
  transition: 0.05s ease;

  a {
    font-size: 14px;
    text-decoration: none;
    display: inline-block;

    :hover {
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }
`
