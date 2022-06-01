import styled from "styled-components";

interface StyleProps {
  color: string
}

export const Tag = styled.div<StyleProps>`
  padding: 2px 6px;
  background: ${({ color }) => color};
  border-radius: 4px;
  font-size: 11px;
`;