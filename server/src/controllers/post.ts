import { Request, Response } from "express"
import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid';

import Post from '../models/post'
import * as T from '../types'
import slugify from '../helpers/slugify';

export const createPost = (req: any, res: Response) => {
  const { title, webLink, githubLink, description, categories, type, status } = req.body;
  const slug = slugify(title as string)
  let post = new Post({
    title, slug, webLink, githubLink, description, categories, type, status
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

export const listPosts = async (req: Request, res: Response) => {
  const keyword = req.query.keyword
    ? {
      $or: [
        {
          title: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        },
        {
          description: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        },
      ],
    }
    : {};

  const posts = await Post.find({ ...keyword })
    .populate('categories', 'name slug')
    .sort({ createdAt: -1 })
  
  if (posts.length) {
    res.json(posts)
  } else {
    res.status(400).json({
      error: `${req.query.keyword}에 대한 포스트가 존재하지 않습니다`
    });
  }
}

export const readPost = (req: Request, res: Response) => {
  const { slug } = req.params;
  
  Post.findOne({ slug })
    .populate('categories', 'name')
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

export const uploadImageFile = (req: any, res: Response) => {
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
    Key: `post/${uuidv4()}.${type}`,
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
    return res.json(data.Location);
  })
};
