import styled from 'styled-components'

export const BasicButton = styled.button`
  display: inline-block;
  width: 100%;
  height: 52px;
  cursor: pointer;
  font-size: 1.25rem;
  transition: background-color .3s ease;
  border: 1px solid ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
  border-radius: 4px;

  &:hover {
    color: ${({ theme }) => theme.body};
    background-color: ${({ theme }) => theme.text};
  }
`