import { NextFunction, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user'

export const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      if (token) {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;
        // Find the user by id
        await User.findOne({ _id: decoded._id }).exec((err, user) => {
          if (err || !user) {
            return res.status(400).json({
              error: '사용자를 찾을 수 없습니다'
            })
          }
          req.profile = user
          next()
        })
      }
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token expired, login again');
    }
  } else {
    res.status(401);
    throw new Error('There is no token attached to the header');
  }
}

export const adminMiddleware = (req: any, res: Response, next: NextFunction) => {
let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      if (token) {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;
        // Find the user by id
        User.findOne({ _id: decoded._id }).exec((err, user) => {
          if (err || !user) {
            return res.status(400).json({
              error: '사용자를 찾을 수 없습니다'
            })
          }

          if (user.role !== 'admin') {
            return res.status(400).json({
              error: '관리자만 접근할 수 있는 페이지입니다'
            })
          }
          
          req.profile = user
          next()
        })
      }
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token expired, login again');
    }
  } else {
    res.status(401);
    throw new Error('There is no token attached to the header');
  }
}