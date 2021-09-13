import styled from 'styled-components'

type StyleProps = {
  compact?: boolean;
}

export const Contents = styled.div<StyleProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-top: 1px solid ${({ theme }) => theme.text};
  border-bottom: 1px solid ${({ theme }) => theme.text};
  padding: 8px 24px;
  cursor: pointer;
`

export const Date = styled.span`
  font-size: 14px;
`

export const Tag = styled.span`
  padding: 1px 5px;
  margin-left: 4px;
  display: inline-block;
  font-size: 11px;
  border: 1px solid ${({ theme }) => theme.text};
`

export const Title = styled.div<StyleProps>`
  font-size: ${({ compact }) => compact ? '13px' : '18px'};
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: ${({ compact }) => compact ? '0' : '6px 0'};
  border-bottom: ${({ compact }) => compact ? 'none' : '1px solid ${({ theme }) => theme.text}'};
`

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
`
export const ReadMore = styled.div`
  position: relative;
  margin-top: auto;
  align-self: flex-end;
  font-size: 14px;
`

export const Abstract = styled.p`
  font-size: 13px;
  margin: 6px 0;
`

export const Category = styled.div`
`