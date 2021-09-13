import styled, {css} from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
`

export const Profile = styled.div`
  font-size: 13px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0.25rem 0;
  padding: 8px 24px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.text};
`

export const Item = css`
  font-size: 13px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.text};
  padding: 2px 0;
  margin: 2px 0;
  display: grid;
  grid-template-columns: 1fr 4fr;
`

export const Location = styled.p`
  ${Item}
`

export const GitHub = styled.p`
  ${Item}
`

export const Email = styled.p`
  ${Item}
`

export const Tab = styled.div`
  border: 1px solid ${({ theme }) => theme.text};
  box-sizing: border-box;
  cursor: pointer;
`