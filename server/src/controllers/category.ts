import { Request, Response } from "express"

import Category from '../models/category'
import Post from '../models/post'
import slugify from "../helpers/slugify";

export const createCategory = (req: any, res: Response) => {
  const { name } = req.body;
  
  const slug = slugify(name as string)
  let category = new Category({ name, slug })
  category.postedBy = req.profile._id;
  
  // Save to DB
  category.save((err: any, success: string) => {
    if (err) {
      return res.status(400).json({
        error: '데이터베이스에 카테고리를 저장하지 못하였습니다'
      })
    }
    return res.json(success)
  })
}

export const listCategory = (req: Request, res: Response) => {
  Category.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: '카테고리를 로드할 수 없습니다'
      })
    }
    res.json(data)
  })
}

export const readCategory = (req: Request, res: Response) => {
  const { slug } = req.params;
  const { limit, skip } = req.body
  
  let limits = limit ? parseInt(limit) : 10
  let skips = skip ? parseInt(skip) : 0
  
  Category.findOne({ slug })
    .populate('postedBy', '_id name username')
    .exec((err, category) => {
      if (err) {
        return res.status(400).json({
          error: '카테고리를 로드할 수 없습니다'
        })
      }
      Post.find({ categories: category })
        .populate('postedBy', '_id name username')
        .populate('categories', 'name slug')
        .sort({ createdAt: -1 })
        .limit(limits)
        .skip(skips)
        .exec((err, posts) => {
          if (err) {
            return res.status(400).json({
              error: '카테고리에 해당하는 링크를 로드할 수 없습니다'
            })
          }
          res.json({ category, posts })
        })
    })
}

export const deleteCategory= (req: Request, res: Response) => {
}