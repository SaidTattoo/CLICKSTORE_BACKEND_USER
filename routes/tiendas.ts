import { Router,Request,Response } from "express";
import { verificarToken } from "../middlewares/authentication";

const tiendasRouter  = Router();

tiendasRouter.get('/lista', verificarToken,(req:Request, res:Response)=>{
    res.json({
        data:verificarToken
    })
})
export default tiendasRouter