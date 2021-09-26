import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  text-align: center;
`

const bounceDelay = keyframes`
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
`

const Bounce = css`
  width: 8px;
  height: 8px;
  background-color: ${({ theme }) => theme.text};
  margin: 0 0.1rem;
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: ${bounceDelay} 1.4s infinite ease-in-out both;
  animation: ${bounceDelay} 1.4s infinite ease-in-out both;
`

export const Bounce1 = styled.div`
  ${Bounce}
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
`

export const Bounce2 = styled.div`
  ${Bounce}
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
`

export const Bounce3 = styled.div`
  ${Bounce}
`