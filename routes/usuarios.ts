import { Router,Request,Response } from "express";
import { Usuario } from "../models/usuario";
import   bcrypt    from 'bcrypt'
import Token from '../classes/token'
import { verificarToken } from "../middlewares/authentication";
const usuariosRouter  = Router();

usuariosRouter.post('/create', (req : Request, res : Response) => {
    
    const user = {
        nombre  :req.body.nombre,
        email   :req.body.email,
        password:bcrypt.hashSync(req.body.password,10),
        avatar  :req.body.avatar
    }

    Usuario.create( user ).then( userDB => {

        const tokenUser = Token.getJWToken({
            _id: userDB._id,
            nombre:userDB.nombre,
            email:userDB.email,
            avatar:userDB.avatar
        });

        res.json({
            ok:true,
            user:tokenUser
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
                ok:true,
                user:userDB
            })
        })
})
usuariosRouter.post('/delete',(req: Request, res : Response) => {
    
})
usuariosRouter.post('/update',verificarToken,(req: any, res : Response) => {

    const user = {
        nombre  :req.body.nombre ||  req.usuario.nombre,
        email   :req.body.email  ||  req.usuario.email,
        avatar  :req.body.avatar ||  req.usuario.avatar
    }

    Usuario.findByIdAndUpdate( req.usuario._id, user, { new: true}, (err,userDB)=>{
        if(err) throw err;
        if(!userDB){
            res.json({
                ok:false,
                mensaje:'No existe usuario'
            })
        }else{
            const tokenUser = Token.getJWToken({
                _id:userDB._id,
                nombre:userDB.nombre,
                email:userDB.email,
                avatar:userDB.avatar
            });
            res.json({
                ok:true,
                token:tokenUser,
                user:userDB
            })
        } 
    })
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

            const tokenUser = Token.getJWToken({
                _id: userDB._id,
                nombre:userDB.nombre,
                email:userDB.email,
                avatar:userDB.avatar
            });

            res.json({
                ok:true,
                token:tokenUser
            })
        }
    })
})
export default usuariosRouter



