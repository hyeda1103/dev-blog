import styled from 'styled-components';
import { MdError } from 'react-icons/md'

export const ErrorWrapper = styled.div`
  margin: 7px 6px;
  color: ${({ theme }) => theme.text};

  svg {
    vertical-align: middle;
    display: inline-block;
  }

  span {
    vertical-align: middle;
    display: inline-block;
  }
  
`;

export const ErrorIcon = styled(MdError)`
  margin-right: 7px;
`;
