import { Universidades } from './../models/universidades';
import { Router,Request,Response } from "express";
import { verificarToken } from "../middlewares/authentication";

const universidadRouter  = Router();

universidadRouter.get('/list',(req:Request, res:Response)=>{
   
    Universidades.find().then(universidadDB => {
        res.json({
            data:universidadDB
        })
    })
})

universidadRouter.post('/create',(req:Request, res:Response) => {
    const university = {
        nombre : 'INACAP Sede Apoquindo'
    }
    Universidades.create(university).then( universidadDB => {
        res.json({
            data:universidadDB
        })
    })
})
export default universidadRouter


