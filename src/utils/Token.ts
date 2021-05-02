import jwt from 'jsonwebtoken'
import { AUTH } from './../config/auth.config'

export const token = (id: string) => {
    const { secret } = AUTH
    return jwt.sign({ id }, secret, {
        expiresIn: 86400 // 24 hours
    })
} 