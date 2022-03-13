import { Request, Response } from 'express'
import AWS from 'aws-sdk'
import jwt from 'jsonwebtoken'

import User from '../models/user'
import { registerEmailParams } from '../../helpers/sendEmail'

export const register = (req: Request, res: Response) => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  const { name, email, password } = req.body;
  // Check if the user exists in DB
  User.findOne({ email }).exec((error, user) => {
    if (user) {
      return res.status(400).json({
        error: '이미 가입한 이메일 주소입니다'
      })
    }
    // Generate token with user name, email, and password
    const token = jwt.sign({ name, email, password }, `${process.env.JWT_ACCOUNT_ACTIVATION}`, {
      expiresIn: '10m'
    })
    // Send email
    const params = registerEmailParams(email, token)
    
    const sendEmailonRegister = new AWS.SES({
      apiVersion: '2010-12-01'
    }).sendEmail(params).promise()
    
    sendEmailonRegister.then(data => {
      console.log('Email submitted to SES', data)
      res.json({
        message: `이메일 인증메일이 ${email}로 발송되었습니다. 10분 이내로 이메일을 확인하고 회원가입 절차를 완료하여 주십시오`
      })
    }).catch(error => {
      console.log('SES email on register', error)
      res.json({
        error: '이메일 인증을 진행할 수 없습니다. 다시 시도하여 주십시오.'
      })
    })
  })
}