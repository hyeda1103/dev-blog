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

