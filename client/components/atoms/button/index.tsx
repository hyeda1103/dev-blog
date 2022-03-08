import React from 'react'
import { BasicButton } from './styles';

interface Props {
  children: string
}

const Button = ({ children }: Props) => {
  return (
    <BasicButton type="submit">
      {children}
    </BasicButton>
  )
}

export default Button