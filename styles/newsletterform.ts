import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border: 1px solid ${({ theme }) => theme.text};
  padding: 8px 24px 16px;

  &:before {
    content: "";
  }

  &:after {
    content: "";
    position: absolute;
    top: -1px;
    right: -1px;
    border-style: solid;
    border-width: 0 13px 13px 0;
    border-color: ${({ theme }) => `${theme.text} ${theme.body}`};
    transition: all ease 0.5s;
  }
`

export const EmailInput = styled.input`
  width: 100%;
  height: 30px;
  padding: 0 8px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.text};
  outline: none;
  display: flex;
  z-index: 19;
`

export const SubmitButton = styled.button`
  width: 100%;
  white-space: nowrap;
`

type StyleProps = {
  status: string
}

export const Message = styled.p<StyleProps>`
  font-size: 11px;
  text-align: center;
  color: ${({ status, theme }) => status === 'error' ? '#E74A3C' : theme.text}
`