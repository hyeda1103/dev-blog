import { Response } from "express"

export const profile = (req: any, res: Response) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  
  return res.json(req.profile)
}
