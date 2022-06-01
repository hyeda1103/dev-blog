import styled from 'styled-components';
import { FaArrowAltCircleRight } from "react-icons/fa"; 

export const ArrowIcon = styled(FaArrowAltCircleRight)`
  font-size: 17px;
  margin-right: 8px;
`;

export const ListItem = styled.li`
  margin: 0.5rem 0;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    -webkit-box-shadow: 0 2px ${({ theme }) => theme.text};
    box-shadow: 0 2px ${({ theme }) => theme.text};
  }
`;

