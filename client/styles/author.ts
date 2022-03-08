import styled, {css} from "styled-components";
import { SiGmail, SiGithub, SiLinkedin } from "react-icons/si";

export const Container = styled.div`
  position: relative;
  margin-top: 34px;
`

export const Profile = styled.div`
  position: relative;
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
  display: grid;
  align-items: center;
  margin: 2px 0;
  grid-template-columns: 1fr 10fr;
`

export const Location = styled.p`
  ${Item}
`

export const GitHub = styled.p`
  ${Item}
`

export const Email = styled.div`
  ${Item}
`

export const LinkedIn = styled.div`
  ${Item}
  align-items: flex-start;
`

export const Tab = styled.div`
  border: 1px solid ${({ theme }) => theme.text};
  box-sizing: border-box;
  cursor: pointer;
`

export const EmailIcon = styled(SiGmail)`
  font-size: 13px;
`

export const GitHubIcon = styled(SiGithub)`
  font-size: 14px;
`

export const LinkedInIcon = styled(SiLinkedin)`
  font-size: 14px;
  margin-top: 2.5px;
`
