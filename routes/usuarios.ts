import { Router,Request,Response } from "express";
import { Usuario } from "../models/usuario";
import   bcrypt    from 'bcrypt'
import { ReplSet } from "mongodb";

const usuariosRouter  = Router();

usuariosRouter.post('/create', (req : Request, res : Response) => {
    const user = {
        nombre  :req.body.nombre,
        email   :req.body.email,
        password:bcrypt.hashSync(req.body.password,10),
        avatar  :req.body.avatar
    }
    Usuario.create( user ).then( userDB => {
        res.json({
            ok:true,
            user:userDB
        })
    }).catch(err => {
        res.json({
            ok:false,
            user:err
        })
    })
})
usuariosRouter.get('/list',(req:Request, res:Response)=>{
        Usuario.find().then( userDB  =>{
            res.json({
                ok:false,
                user:userDB
            })
        })
})
usuariosRouter.post('/delete',(req: Request, res : Response) => {
    
})
usuariosRouter.post('/update',(req: any, res : Response) => {
    
})
usuariosRouter.post('/login',(req: Request, res : Response)=>{
    const body = req.body;
    Usuario.findOne({email: body.email},(err, userDB) => {
        if(err) throw err
        if(!userDB){
            return res.json({
                ok:false,
                mensaje:'User / password incorrect !'
            })
        }
        if(userDB.compararPassword(body.password)){
            res.json({
                ok:true,
                token:'tokendeejemplo'
            })
        }
    })
})
export default usuariosRouter



