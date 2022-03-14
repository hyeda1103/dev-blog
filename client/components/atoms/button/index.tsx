import React, { MouseEventHandler } from 'react'
import { BasicButton } from './styles';

interface Props {
  onClick?: MouseEventHandler
  children: string
}

const Button = ({ onClick, children }: Props) => {
  return (
    <BasicButton type="submit" onClick={onClick}>
      {children}
    </BasicButton>
  )
}

export default Button