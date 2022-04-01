import styled from 'styled-components'

interface StyleProps {
  reverse: boolean
}

export const GridLayout = styled.section<StyleProps>`
  position: relative;
  display: grid;
  grid-template-columns: 3fr 1fr;
  column-gap: 24px;
`

export const MainCol = styled.main`
  position: relative;
`;

export const SubCol = styled.aside`
  position: sticky;
  align-self: start;
  top: 112px;
`;