import { Request, Response } from "express"

import slugify from '../helpers/slugify'
import Link from '../models/link'
import * as T from '../types'

export const createLink = (req: any, res: Response) => {
  const { title, url, categories, type, medium } = req.body;
  const slug = slugify(url)
  let link = new Link({
    title, url, slug, categories, type, medium
  });
  link.postedBy = req.profile._id;
  
  link.save((err: string, data: T.Link) => {
    if (err) {
      return res.status(400).json({
        error: '이미 등록된 링크입니다'
      })
    }
    res.json(data)
  })
}

export const listLink = (req: Request, res: Response) => {
  Link.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: '링크를 찾을 수 없습니다'
      })
    }
    res.json(data)
  })
}

export const readLink = (req: Request, res: Response) => {
}

export const deleteLink= (req: Request, res: Response) => {
}