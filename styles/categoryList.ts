import styled from 'styled-components'

export const List = styled.ul`
  position: relative;
  box-sizing: border-box;
  padding: 8px 24px;
  border: 1px solid ${({ theme }) => theme.text};

  &:before {
    content: '카테고리';
    position: absolute;
    top: -50%;
  }
`

export const Item = styled.li`
  list-style: none;
  cursor: pointer;
  padding: 1px 5px;
  margin-right: 0.25rem;
  display: inline-block;
  font-size: 11px;
  border: 1px solid ${({ theme }) => theme.text};
`
