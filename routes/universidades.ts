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

universidadRouter.get('/miuniversidad',verificarToken,(req:any, res:Response) => {
    Universidades.findById(req.usuario.universidad).then(universidadesDB => {
        res.json({
            data:universidadesDB
        })
    })
})

universidadRouter.post('/create',(req:Request, res:Response) => {
    const university = {
        nombre : 'UNIVERSIDAD EL BAJON',
        tiendas:[
            {nombre:'el carrito'},
            {nombre:'zukulentos'},
        ]
    }
    Universidades.create(university).then( universidadDB => {
        res.json({
            data:universidadDB
        })
    })
})
export default universidadRouter


