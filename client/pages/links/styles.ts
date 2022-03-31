import styled, { css } from 'styled-components'
import { HiLink } from 'react-icons/hi'

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid ${({ theme }) => theme.text};
  padding: 8px 0;
`;

export const CategoryInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid ${({ theme }) => theme.text};
  padding: 16px 24px;
  p {
    font-size: 32px;
  }
`;

export const ImageWrapper = styled.div`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 50%;
  overflow: hidden;
  width: 200px;
`;

export const Profile = styled.img`
  width: 200px;
`;

export const LinkList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 24px;
`;

export const LinkItem = styled.div`
  border: 1px solid ${({ theme }) => theme.text};
  padding: 8px 24px;
`;

export const LinkIcon = styled(HiLink)`
  font-size: 17px;
  color: ${({ theme }) => theme.body};
  background-color: ${({ theme }) => theme.hyperlink.default};
  vertical-align: middle;
  padding: 6px;
  margin-right: 8px;
`;

export const Title = styled.p`
  font-size: 20px;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  vertical-align: middle;
  margin: 8px 0;

  a {
    color: ${({ theme }) => theme.hyperlink.default};

    &:hover {
      text-decoration: underline;
      text-underline-offset: 2px;
      ${LinkIcon} {
        color: ${({ theme }) => theme.hyperlink.contrast};
      }
    }
  }
`

export const PostedAt = styled.div`
  text-align: right;
  font-size: 14px;
`;


const Tag = css`
  padding: 2px 8px;
  border: 1px solid ${({ theme }) => theme.text};
  font-size: 14px;
`

export const TagBox = styled.div`
  display: flex;
  gap: 6px;
`;

export const CategoryTag = styled.span`
  ${Tag}
`

export const Type = styled.span`
  ${Tag}
`

export const Medium = styled.span`
  ${Tag}
`

export const ResultWrapper = styled.div`
  font-size: 32px;
`;
