import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const runtimeConfig = useRuntimeConfig()
const prisma = new PrismaClient()
const logger = useLogger()

interface IPrismaError extends Error {
  message: string
}

class Admin {
  
  async create(nickname: string, email: string, password: string) {
    const salt = crypto.randomBytes(16).toString('hex');
    const admin = await prisma.admin
      .create({
        data: {
          nickname: nickname,
          email: email,
          password: createHash(password)
        }
      })
      .catch((error: IPrismaError) => {
        logger.error(error)
        throw createError({
          statusCode: 500,
          statusMessage: `can't create new ${this.constructor.name}!`,
          data: error.message
        })
      })
    return admin
  }
  
  async updatePassword(id: number, password: string) {
    const salt = crypto.randomBytes(16).toString('hex');
    const updatedadmin = await prisma.admin.update({
      where: { id: id },
      data: {
        password: createHash(password)
      }
    })
    return updatedadmin
  }


  async findByEmail(options: any) {
    const userRecord = await prisma.admin
      .findFirst({
        where: {
          email: options.email
        }
      })
      .catch((error: Error) => {
        logger.error(error)
        throw createError({
          statusCode: 500,
          statusMessage: `Could not find ${this.constructor.name}! Please try again later.`
        })
      })

    return userRecord
  }

  async findInfoByEmail(options: any) {
    const userRecord = await this.findByEmail(options)
    if (!userRecord) return null
    return { 
      id: userRecord.id,
      nickname: userRecord.nickname,
      email: userRecord.email,
      loginToken: userRecord.loginToken,
    } as IAdminProfile
  }

  async findById(options: any) {
    const userRecord = await prisma.admin
      .findFirst({
        where: {
          id: options.id
        }
      })
      .catch((error: Error) => {
        logger.error(error)
        throw createError({
          statusCode: 500,
          statusMessage: `Could not find ${this.constructor.name}! Please try again later.`
        })
      })

    return userRecord
  }

  async verifyToken(id: number, token: string) {
    const adminData = await prisma.admin
      .findFirst({
        where: { id: id }
      })
      .catch((error: Error) => {
        logger.error(error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Could not find user. Please try again later.'
        })
      })
    
    // 更新紀錄

    if (adminData) {
      return adminData.loginToken === token
    }

    return false
  }


  async verifyPassword(email: string, password: string) {
    const adminData = await this.findByEmail({ email });
    if (!adminData || !adminData.password) {
      logger.http('not found user!')
      throw createError({
        statusCode: 400,
        statusMessage: 'not found user!'
      })
    }

    // compare password
    console.log('====================================');
    console.log('hash', password, adminData.password);
    console.log('====================================');
    if(!verifyHash(password, adminData.password)) {
      logger.http('email or password error!')
      throw createError({
        statusCode: 400,
        statusMessage: 'email or password error!'
      })
    }

    return { adminData }
  }

  async login(email: string, password: string) {

    logger.info(`login:${email}:${password}`)
    const { adminData } = await this.verifyPassword(email, password)

    const maxAge = 60 * 60 * 24 * 7
    const expires = Math.floor(Date.now() / 1000) + maxAge
    const jwtToken = jwt.sign(
      {
        exp: expires,
        data: { id: adminData.id }
      },
      runtimeConfig.jwtSignSecretbackstage
    )

    // update token
    await prisma.admin.update({
      where: { id: adminData.id },
      data: {
        lastLoginAt: new Date(),
        loginToken: jwtToken
      },
    })
    .catch((error: Error) => {
      logger.error(error)
      throw createError({
        statusCode: 500,
        statusMessage: 'unknown error'
      })
    })

    
    const userInfo = await this.findInfoByEmail({ email });

    return userInfo
  }

  async logout(id: number) {
    return await prisma.admin.update({
      where: { id: id },
      data: {
        loginToken: null
      }
    })
    .catch((error: Error) => {
      console.error(error)
      throw createError({
        statusCode: 500,
        statusMessage: 'unknown error'
      })
    })
  }
}


const admin = new Admin()
export default admin