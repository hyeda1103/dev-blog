import { Request, Response } from 'express'

export const register = (req: Request, res: Response) => {
  console.log('REGISTER CONTROLLER', req.body)
}