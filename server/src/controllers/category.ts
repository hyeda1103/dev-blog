import { Request, Response } from "express"
import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid';

import Category from '../models/category'
import Link from '../models/link'
import slugify from "../helpers/slugify";

export const createCategory = (req: any, res: Response) => {
  const { name, image, content } = req.body;
  // image data
  const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const type = image.split(';')[0].split('/')[1];
  
  const slug = slugify(name as string)
  let category = new Category({ name, content, slug  })
  
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
    category.image.url = data.Location
    category.image.key = data.Key
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
      console.log(category)
      Link.find({ categories: category })
        .populate('postedBy', '_id name username')
        .populate('categories', 'name slug')
        .sort({ createdAt: -1 })
        .limit(limits)
        .skip(skips)
        .exec((err, links) => {
          if (err) {
            return res.status(400).json({
              error: '카테고리에 해당하는 링크를 로드할 수 없습니다'
            })
          }
          res.json({ category, links })
        })
    })
}

export const deleteCategory= (req: Request, res: Response) => {
}