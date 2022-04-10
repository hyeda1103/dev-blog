import { Request, Response } from "express"

import slugify from '../helpers/slugify'
import Post from '../models/post'
import * as T from '../types'

export const createPost = (req: any, res: Response) => {
  const { title, webLink, githubLink, description, categories, type } = req.body;
  let post = new Post({
    title, webLink, githubLink, description, categories, type
  });
  post.postedBy = req.profile._id;
  
  post.save((err: string, data: T.Post) => {
    if (err) {
      console.log(err)
      return res.status(400).json({
        error: '이미 등록된 포스트입니다'
      })
    }
    res.json(data)
  })
}

export const listPost = (req: Request, res: Response) => {
  Post.find({})
    .populate('categories', 'name slug')
    .sort({ createdAt: -1 })
    .exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: '포스트를 찾을 수 없습니다'
      })
    }
    res.json(data)
  })
}

export const readPost = (req: Request, res: Response) => {
  const { id } = req.params;
  Post.findById(id, function (err: string, result: T.Post) {
    if (err) {
      console.error(err);
      return res.status(400).json({
          error: '해당 포스트는 존재하지 않습니다'
      });
    }
    res.json(result);
  })
}

export const deletePost= (req: Request, res: Response) => {
}

export const clickCount = (req: Request, res: Response) => {
  const { postId } = req.body;
  Post.findByIdAndUpdate(postId, {
    $inc: { clicks: 1 }
  }, {
    upsert: true, new: true
  }).exec((err, result) => {
      if (err) {
        console.error(err);
        return res.status(400).json({
          error: '클릭수를 업데이트할 수 없습니다'
        });
      }
      res.json(result);
    });
};