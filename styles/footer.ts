import styled from 'styled-components'

export const Container = styled.header`
  position: absolute;
  width: 100%;
  padding: 0.5rem 0;
  background: ${({ theme }) => theme.text};
  bottom: 0;
`

export const Inner = styled.div`
  width: 960px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Copyright = styled.h2`
  color: ${({ theme }) => theme.body};
`
