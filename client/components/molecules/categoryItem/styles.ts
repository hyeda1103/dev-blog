import styled from 'styled-components'

export const Container = styled.li`
  cursor: pointer;
  display: inline-block;
  align-items: center;
  padding: 2px 8px;
  border: 1px solid ${({ theme }) => theme.text};
  margin: 2px;
  font-size: 14px;

  &:hover {
    background-color: ${({ theme }) => theme.highlight};
  }
`;
