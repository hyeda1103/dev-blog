import 'react-tippy/dist/tippy.css'
import {
  Tooltip,
} from 'react-tippy';
import { Title, Content } from '@/styles/tippy'

export default function Tippy({ tooltipContent, children }: any) {
  return (
    <Tooltip
      // options
      position="bottom"
      trigger="mouseenter"
      interactive
      duration={200}
      html={(
        <Title>{tooltipContent}</Title>
      )}
    >
      <Content>
      {children}
      </Content>
    </Tooltip>
  )
}
