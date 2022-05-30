import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
  display: flex;
  align-items: center;
`

export const Inner = styled.div`
  width: 840px;
  height: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Logo = styled.h3`
  a {
    font-size: 28px;
  }
`

export const Nav = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  list-style: none;
  position: relative;
`

const Hover = keyframes`
  0% {
    transform: scaleX(0);
    height: 5px;
  }
  45% {   
    transform: scaleX(1.05);
    height: 5px;
  }
  55% {
    height: 5px;
  }
  100% {
    transform: scaleX(1.05);
    height: 3.8rem;
  }
`;

const NoHover = keyframes`
  0% {
    transform: scaleX(1.05);
    height: 3.8rem;
  }
  45% {
    height: 5px;
  }
  55% {   
    transform: scaleX(1.05);
    height: 5px;
    opacity: 1;
  }
  100% {
    transform: scaleX(0);
    height: 5px;
    opacity: .02;
  }
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;
  padding: 0 2px;
  transition: 0.05s ease;

  a {
    font-size: 14px;
    text-decoration: none;
    display: inline-block;

    :hover {
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }
`
