import jwt  from 'jsonwebtoken'
import { AUTH } from './../config/auth.config'
import { Request, Response, NextFunction } from 'express'
import { NotAuthorizedError } from '@oregtickets/common'

export const VerifyToken = async (req: Request, res: Response, next: NextFunction ) => {
    const { headers } = req
    const token = headers['x-access-token']
    const { secret } = AUTH

    if (!token) {
        throw new NotAuthorizedError()
    }

    jwt.verify(token as string, secret, (err, decoded) => {
        if (err) {
            return res.status(403).send({
                message: 'Forbidden Error'
            })
        }
        // const { id } = decoded as any
        // (req as any).id = id
        next()
    })
}

export const AddHeader = async (req: Request, res: Response, next: NextFunction ) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  }