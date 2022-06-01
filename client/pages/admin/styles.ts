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
`;

export const Header = styled.div`
  margin-bottom: 28px;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 12px;
`;

export const Logline = styled.p`
  color: ${({ theme }) => theme.subText};
  font-size: 14px;
`;

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
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      -webkit-box-shadow: 0 2px ${({ theme }) => theme.text};
      box-shadow: 0 2px ${({ theme }) => theme.text};
    }
  }
`;

