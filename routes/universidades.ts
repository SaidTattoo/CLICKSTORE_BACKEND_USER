import { Universidades } from './../models/universidades';
import { Router,Request,Response } from "express";
import { verificarToken } from "../middlewares/authentication";
import { Usuario } from "../models/usuario";
const universidadRouter  = Router();
const token = "5f45a5022348761538defafe"
universidadRouter.get('/list',(req:Request, res:Response)=>{
   
    Universidades.find().then(universidadDB => {
        res.json({
            data:universidadDB
        })
    })
})

universidadRouter.post('/miuniversidad',verificarToken,(req:any, res:Response) => {

    

    Universidades.findById(/*req.usuario.universidad*/token).then(universidadesDB => {
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


