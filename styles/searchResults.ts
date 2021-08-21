import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  top: 5rem;
  background: ${({ theme }) => theme.body};
  padding: 0.5rem;
  box-sizing: border-box;
  box-shadow: 1px 3px 3px ${({ theme }) => theme.text};
`
