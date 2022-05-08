import { Request, Response } from "express"
import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid';

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
  Post.findOne({ _id: id })
    .populate('categories', 'name slug')
    .exec((err, data) => {
      if (err) {
        console.error(err);
        return res.status(400).json({
            error: '해당 포스트는 존재하지 않습니다'
        });
      }
      res.json(data);
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

export const uploadImageFile = async (req: Request, res: Response) => {
  const { image } = req.body;

  // image data
  const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const type = image.split(';')[0].split('/')[1];
  
  // s3
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });
  // Upload image to s3
  const params = {
    Bucket: 'dev-blog-for-ten',
    Key: `category/${uuidv4()}.${type}`,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `image/${type}`
  }
  s3.upload(params, (err: globalThis.Error, data: AWS.S3.ManagedUpload.SendData) => {
    if (err) {
      return res.status(400).json({
        error: 'S3 업로드에 실패하였습니다'
      })
    }
    console.log('AWS 업로드 RES DATA', data)
    return data.Location;
  })
};