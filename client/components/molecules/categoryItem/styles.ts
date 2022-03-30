import styled from 'styled-components'

export const Container = styled.li`
  cursor: pointer;
  display: inline-block;
  align-items: center;
  padding: 2px 8px;
  border: 1px solid ${({ theme }) => theme.text};

  &:hover {
    transform: translate(-1px, -1px);
    box-shadow: 1px 1px ${({ theme }) => theme.text};
  }

  & + & {
    margin-left: 4px;
  }
`;
