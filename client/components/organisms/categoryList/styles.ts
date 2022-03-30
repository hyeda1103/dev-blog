import styled from 'styled-components'

export const Container = styled.ul`
  position: relative;
  list-style: none;
  box-sizing: border-box;
  padding: 8px 24px;
  border: 1px solid ${({ theme }) => theme.text};
`;


export const Title = styled.li`
  cursor: pointer;
  display: inline-block;
  align-items: center;
  margin-right: 8px;
  font-weight: 700;

  &:hover {
    transform: translate(-1px, -1px);
    box-shadow: 1px 1px ${({ theme }) => theme.text};
  }

  & + & {
    margin-left: 4px;
  }
`;
