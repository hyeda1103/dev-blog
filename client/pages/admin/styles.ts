import styled from 'styled-components';
import { FaArrowAltCircleRight } from "react-icons/fa";

export const Container = styled.div`
  position: relative;
  width: 364px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 48px 0;
;`;

export const ArrowIcon = styled(FaArrowAltCircleRight)`
  font-size: 17px;
  margin-right: 8px;
`;

export const SelectList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;

  li {
    margin: 0.5rem 0;
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.text};

    a {
      display: flex;
      align-items: center;
    }

    &:hover {
      background-color: ${({ theme }) => theme.hover};
    }
  }
`;

