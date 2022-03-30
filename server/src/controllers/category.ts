import { Request, Response } from "express"
import fs from "fs"
import { Fields, Files, File, IncomingForm } from 'formidable'
import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid';

import Category from '../models/category'
import slugify from "../helpers/slugify";


export const createCategory = (req: any, res: Response) => {  
  // s3
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });
  let form = new IncomingForm()
  form.parse(req, (err, fields: Fields, files: Files) => {
    if (err) {
      return res.status(400).json({
        error: "이미지를 업로드할 수 없습니다"
      })
    }

    const { name, content } = fields
    const { image } = files

    // name이 한글이면 slug 생성이 제대로 되지 않고 있음
    const slug = slugify(name as string)
    let category = new Category({ name, content, slug  })
    if ((image as File).size > 2000000) {
      return res.status(400).json({
        error: "이미지는 2MB 이하여야 합니다"
      })
    }
    // Upload image to s3
    const params = {
      Bucket: 'dev-blog-for-ten',
      Key: `category/${uuidv4()}`,
      Body: fs.readFileSync((image as File).filepath),
      ACL: 'public-read',
      ContentType: 'image/*'
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
  })
}

export const listCategory = (req: Request, res: Response) => {
}
export const readCategory = (req: Request, res: Response) => {
}
export const deleteCategory= (req: Request, res: Response) => {
}