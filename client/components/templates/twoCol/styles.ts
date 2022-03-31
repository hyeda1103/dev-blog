import styled from 'styled-components'

interface StyleProps {
  reverse: boolean
}

export const GridLayout = styled.section<StyleProps>`
  display: grid;
  grid-template-columns: 3fr 1fr;
  column-gap: 24px;
`

export const MainCol = styled.main`
`;

export const SubCol = styled.aside`
`;