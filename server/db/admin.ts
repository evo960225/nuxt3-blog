import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const runtimeConfig = useRuntimeConfig()
const prisma = new PrismaClient()

interface IPrismaError extends Error {
  message: string
}

class Admin {

  async create(nickname: string, email: string, password: string) {
    const admin = await prisma.admin
      .create({
        data: {
          nickname: nickname,
          email: email,
          password: bcrypt.hashSync(password, 10),
        }
      })
      .catch((error: IPrismaError) => {
        throw createError({
          statusCode: 500,
          statusMessage: `can't create new ${this.constructor.name}!`,
          data: error.message
        })
      })
    return admin
  }
  
  async updatePassword(id: number, password: string) {
    const updatedadmin = await prisma.admin.update({
      where: { id: id },
      data: {
        password: bcrypt.hashSync(password, 10),
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
        console.error(error)
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
        console.error(error)
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
      throw createError({
        statusCode: 400,
        statusMessage: 'email or password error!'
      })
    }

    // compare password
    if(!bcrypt.compareSync(password, adminData.password)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'email or password error!'
      })
    }

    return { adminData }
  }

  async login(email: string, password: string) {
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
      console.error(error)
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