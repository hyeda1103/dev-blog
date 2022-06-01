import React from 'react'

import * as T from '@root/types'
import { Tag } from './styles';

interface Props {
  status: T.Status
}

function StatusTag({ status }: Props) {
  
  const tagColor = ((status: T.Status) => {
    switch (status) {
      case T.Status.In_Progress:
        return '#fbf3da';
      case T.Status.Completed:
        return '#ddedea';
      default:
        return '#ffffff'
    }
  })(status)
  
  return (
    <Tag color={tagColor}>{status}</Tag>
  )
}

export default StatusTag