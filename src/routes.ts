import { Router, Request, Response } from 'express'

import uploadConfig from './uploadConfig'
import multer from 'multer'
import productsController from './productsController'
import usersConntroler from './usersController'
const upload = multer(uploadConfig)

const route = Router()

route.get('/', (req: Request, res:Response) => {
  return res.json({msg: ` 🌏 Api Running 🌝`})
})

  
route.get('/get-all',   productsController.getAll)
route.post('/register', upload.single('image'), productsController.register)
route.put('/update/:id', upload.single('image'), productsController.updateProduct)

route.get('/get-user',  usersConntroler.getAll)
route.post('/register-user',  usersConntroler.registerUser)
route.post('/login',  usersConntroler.Login)
route.post('/auth',  usersConntroler.Auth)

export default route