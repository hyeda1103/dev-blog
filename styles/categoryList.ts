import styled from 'styled-components'

export const List = styled.ul`
  position: relative;
  box-sizing: border-box;
  padding: 8px 24px;
  border: 1px solid ${({ theme }) => theme.text};
`

export const Item = styled.li`
  list-style: none;
  cursor: pointer;
  padding: 1px 5px;
  margin-right: 0.25rem;
  display: inline-block;
  font-size: 11px;
  border: 1px solid ${({ theme }) => theme.text};

  &:hover {
    transform: translate(-1px, -1px);
    box-shadow: 1px 1px ${({ theme }) => theme.text};
  }
`
