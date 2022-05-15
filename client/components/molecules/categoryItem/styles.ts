import styled from 'styled-components'

export const Container = styled.li`
  cursor: pointer;
  display: inline-block;
  align-items: center;
  padding: 1px 8px;
  border: 1px solid ${({ theme }) => theme.text};
  margin: 2px;
  font-size: 14px;

  &:hover {
    -webkit-box-shadow: 0 0 2px 2px ${({ theme }) => theme.highlight};
    box-shadow: 0 0 2px 2px ${({ theme }) => theme.highlight};
  }
`;
