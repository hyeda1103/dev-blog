import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next';
import Link from 'next/link'
import axios from 'axios'
import DOMPurify from "dompurify";
import InfiniteScroll from "react-infinite-scroll-component";

import Layout from '@/components/templates/layout';
import ProjectItem from '@/components/molecules/projectItem';
import * as T from '@/types/index'
import { API } from '../../config'
import { LinkList } from './styles';

interface Props {
  projects: Array<T.Link>
  numOfProjects: number
  projectsLimit: number
  projectSkip: number
}

function ProjectList({ projects, numOfProjects, projectsLimit, projectSkip }: Props) {
  const [allLinks, setAllLinks] = useState<Array<T.Project>>(projects)
  const [limit, setLimit] = useState(projectsLimit);
  const [skip, setSkip] = useState(projectSkip)
  const [size, setSize] = useState(numOfProjects)

  useEffect(() => {
    setAllLinks(projects)
    setSkip(projectSkip)
    setSize(numOfProjects)
    setLimit(projectsLimit)
  }, [projects, projectSkip, numOfProjects, projectsLimit])
  
  // const loadMore = async () => {
  //   let toSkip = skip + limit
  //   setSkip(toSkip)
  //   const res = await axios.post(`${API}/projects`, { skip: toSkip, limit })
  //   console.log(res.data.projects)
  //   setAllLinks([...allLinks, ...res.data.projects])
  //   setSize(res.data.projects.length)
  // }
  
  return (
    <Layout>
      {/* <InfiniteScroll
        dataLength={allLinks.length}
        next={loadMore}
        hasMore={size > 0 && size >= limit}
        loader={<></>}
        endMessage={<></>}
      > */}
        <LinkList>
          {allLinks?.map((link) => (
            <ProjectItem
              key={link._id}
              link={link}
              allLinks={allLinks}
              setAllLinks={setAllLinks}
            />
          ))}
        </LinkList>
      {/* </InfiniteScroll> */}
    </Layout>
  )
}

export default ProjectList

export const getServerSideProps: GetServerSideProps = async () => {
  let skip = 0
  let limit = 5
  
  try {
    const res = await axios.get(`${API}/projects`)
    
    return {
      props: {
        projects: res.data,
        numOfProjects: res.data.length,
        projectsLimit: limit,
        projectSkip: skip,
      }
    }
  } catch (error) {
    return {
      props: {}
    }
  }
  
}