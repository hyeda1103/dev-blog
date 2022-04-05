import React, { useState, useEffect } from 'react'

import * as T from '@/types/index'
import { LinkList as List } from './styles';
import LinkItem from '@/components/molecules/linkItem/index';

interface Props {
  links: Array<T.Link>
}

function LinkList({ links }: Props) {
  const [allLinks, setAllLinks] = useState<Array<T.Link>>(links)
  
  useEffect(() => {
    setAllLinks(links)
  }, [links]) 

  return (
    <List>
      {links && links.map((link) => (
        <LinkItem
          key={link._id}
          link={link}
          allLinks={allLinks}
          setAllLinks={setAllLinks}
        />
      ))}
    </List>
  )
}

export default LinkList