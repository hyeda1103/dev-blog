import { Request, Response } from "express"

import slugify from '../helpers/slugify'
import Project from '../models/project'
import * as T from '../types'

export const createProject = (req: any, res: Response) => {
  const { title, url, categories, type, medium } = req.body;
  const slug = slugify(url)
  let project = new Project({
    title, url, slug, categories, type, medium
  });
  project.postedBy = req.profile._id;
  
  project.save((err: string, data: T.Project) => {
    if (err) {
      return res.status(400).json({
        error: '이미 등록된 링크입니다'
      })
    }
    res.json(data)
  })
}

export const listProject = (req: Request, res: Response) => {
  Project.find({})
    .populate('categories', 'name slug')
    .sort({ createdAt: -1 })
    .exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: '링크를 찾을 수 없습니다'
      })
    }
    res.json(data)
  })
}

export const readProject = (req: Request, res: Response) => {
  
}

export const deleteProject= (req: Request, res: Response) => {
}

export const clickCount = (req: Request, res: Response) => {
  const { linkId } = req.body;
  Project.findByIdAndUpdate(linkId, {
    $inc: { clicks: 1 }
  }, {
    upsert: true, new: true
  }).exec((err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: '클릭수를 업데이트할 수 없습니다'
            });
        }
        res.json(result);
    });
};