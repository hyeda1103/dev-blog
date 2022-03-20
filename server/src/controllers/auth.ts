import { Request, Response } from 'express'
import AWS from 'aws-sdk'
import jwt from 'jsonwebtoken'
import shortId from 'shortid'

import User from '../models/user'
import { registerEmailParams } from '../../helpers/sendEmail'
import { UserRegister } from '../types'

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

export const registerActivate = (req: Request, res: Response) => {
  const { token } = req.body;
  jwt.verify(token, `${process.env.JWT_ACCOUNT_ACTIVATION}`, function (err: any) {
    if (err) {
      return res.status(401).json({
        error: '만료된 링크입니다. 회원가입을 다시 진행해주세요.'
      })
    }

    const { name, email, password } = jwt.decode(token) as UserRegister
    const username = shortId.generate()
    User.findOne({ email }).exec((err, user) => {
      if (user) {
        return res.status(401).json({
          error: '이미 가입된 이메일 주소입니다'
        })
      }
      const newUser = new User({ username, name, email, password })
      newUser.save((err, result) => {
        if (err) {
          return res.status(401).json({
            error: '데이터베이스에 정보를 저장하는 데에 실패했습니다. 다시 시도해주세요.'
          })
        }
        return res.json({
          message: '성공적으로 회원가입하였습니다. 로그인하세요.'
        })
      })
    })
  })
}

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: '가입된 이메일 주소가 아닙니다. 회원가입을 진행해주세요.'
      })
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: '이메일과 비밀번호가 일치하지 않습니다'
      })
    }
    const { _id, name, email, role } = user
    const token = jwt.sign({ _id }, `${process.env.JWT_SECRET}`, {
      expiresIn: '7d'
    })
    return res.json({
      token,
      user: {
        _id,
        name,
        email,
        role,
      }
    })
  })
}