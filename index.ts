import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import route from './src/routes'

dotenv.config()

const {PORT} = process.env

const api = express()

api.use(cors())
api.use(express.json())
api.use(route)

api.listen(PORT, () => {
  console.log(` 🌏 Api Running: ${PORT}`)
})

export default api