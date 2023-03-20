import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import md5 from 'md5'
import { generateToken } from './token'
import { verifyToken } from "./token"



var cloudinary = require('cloudinary')

var imagem = ''
var resultado = ''

const prisma  = new PrismaClient()

async function getAll(req: Request, res: Response) {
  try {
    const data = await prisma.users.findMany()

    return res.status(200).send({data})
  } catch (error) {
    return res.status(400).send({error})
  }
}

async function Login(req: Request, res: Response) {
  try {
   
    const findUser = await prisma.users.findFirst({
      where: {
        email: req.body.email,
      password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
      
      }
    })

    if (!findUser) {
       return res.status(200).send({ msg: "Emamil or pasword invalido!!" })
    }  

    const token = await generateToken({
      email: req.body.email,
      password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
})

    return res.status(200).send({token})
  } catch (error) {
    return res.status(400).send({error})
  }
}

async function registerUser(req: Request, res: Response) {
  try {

    const findUser = await prisma.users.findFirst({
      where: {email: req.body.email}
    })

    if (findUser) {
       return res.status(200).send({ msg: "Email already registered!!" })
    }   
   
    const user = await prisma.users.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
      },
    })
      
    return res.status(200).send({msg: "SUCCESS!!", user})
  } catch (error) {
    return res.status(400).send(error)
  }
}

async function Auth(req: Request, res: Response) {
  try {
     const { token } = req.body || req.params  

  const verify = await verifyToken(token)

  if (!verify) {
    return res.status(400).send({msg: "Token Inválido"})
  }

  return res.status(200).send({msg: "Token Correto!!"})  

  } catch (error) {
  return res.status(200).send({msg: "Deu Erro!!", error})  
    
  }
  }

export default {registerUser, Login, Auth, getAll}