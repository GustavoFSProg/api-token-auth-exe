import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import Auth from './auth'
import { verifyToken } from './token'


var cloudinary = require('cloudinary')

var imagem = ''
var resultado = ''

const prisma  = new PrismaClient()

async function getAll(req: Request, res: Response) {
  try {

  //     const { token } = req.body || req.params  

  // const verify = await verifyToken(token)

  //   if (!verify) {
    
  //   return res.status(400).send({msg: "Token Inválido"})
  // }
    const data = await prisma.products.findMany()

    return res.status(200).send({data})
  } catch (error) {
    return res.status(400).send({error})
  }
}

async function register(req: Request, res: Response) {
  try {
    cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  cloudinary.uploader.upload(req.file?.path, function (result: any, error: any) {
    imagem = result.secure_url
    resultado = result
    console.log(resultado)
  })
 
    const prod = await prisma.products.create({
      data: {
        title: req.body.title,
        image: imagem,
        price: Number(req.body.price),
      },
    })

    return res.status(200).send({msg: "SUCCESS!!", prod})
  } catch (error) {
    return res.status(400).send(error)
  }
}


async function updateProduct(req: Request, res: Response) {
  try {

    cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  cloudinary.uploader.upload(req.file?.path, function (result: any, error: any) {
    imagem = result.secure_url
    resultado = result
    console.log(resultado)
  })
 
    const prod = await prisma.products.update({
      where: {id: req.params.id},
      data: {
        title: req.body.title,
        image: imagem,
        price: Number(req.body.price),
      },
    })

    return res.status(200).send({msg: "SUCCESS!!", prod})
  } catch (error) {
    return res.status(400).send(error)
  }
}

export default {register, updateProduct, getAll}