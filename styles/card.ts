import styled from 'styled-components'

type StyleProps = {
  compact?: boolean;
}

export const Contents = styled.div<StyleProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.text};
  border-left:  ${({ compact, theme }) => compact ? 'none' : `1px solid ${ theme.text }`};
  border-right: ${({ compact, theme }) => compact ? 'none' : `1px solid ${ theme.text }`};
  padding: 8px 24px;
  cursor: pointer;
  transition: ease .07s;
  background: ${({ theme }) => theme.body};

  &:hover {
    background-color: ${({ compact, theme }) => compact ? theme.background : theme.body};
    transform: ${({ compact }) => compact ? 'none' : 'translate(-2px, -2px)'};
    box-shadow: ${({ compact, theme }) => compact ? 'none' : `2px 2px ${ theme.text }`};
  }
`

export const Tag = styled.span`
  padding: 1px 5px;
  margin-left: 4px;
  display: inline-block;
  font-size: 11px;
  border: 1px solid ${({ theme }) => theme.text};

  &:hover {
    transform: translate(-1px, -1px);
    box-shadow: 1px 1px ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.body};
  }
`

export const Main = styled.div<StyleProps>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: ${({ compact }) => compact ? '0' : '6px 0'};
  border-bottom: ${({ compact, theme }) => compact ? 'none' : `1px solid ${theme.text}}`};
`

export const Title = styled.div<StyleProps>`
  font-size: ${({ compact }) => compact ? '13px' : '18px'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const PublishedAt = styled.div<StyleProps>`
  font-size: ${({ compact }) => compact ? '9px' : '13px'};
  margin-left: auto;
  position: relative;
`

export const Info = styled.div`
  display: grid;
  grid-template-columns: 3fr auto;
  gap: 1rem;
  font-size: 13px;
  margin: 6px 0;
  width: 100%;
`

export const Abstract = styled.div`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Category = styled.div`

`