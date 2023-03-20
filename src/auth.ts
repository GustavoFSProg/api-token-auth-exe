import { Request, Response } from "express"
import { verifyToken } from "./token"

async function Auth(req: Request, res: Response) {
  const { token } = req.body || req.params  

  const verify = await verifyToken(token)

  if (!verify) {
    return res.status(400).send({msg: "Token Inválido"})
  }

  return res.status(200).send({msg: "Token Correto!!"})  


}
 
export default Auth