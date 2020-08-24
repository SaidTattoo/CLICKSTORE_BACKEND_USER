import { Router,Request,Response } from "express";
import { Usuario } from "../models/usuario";
import bcrypt     from 'bcrypt'
import Token      from '../classes/token'
import { verificarToken } from "../middlewares/authentication";
const usuariosRouter  = Router();

/**
 * @Crear
 * no se va a utilizar ya que el usuario solo administra su propio estatus
 */
usuariosRouter.post('/create', (req : Request, res : Response) => {
    
    const user = {
        nombre  :req.body.nombre,
        email   :req.body.email,
        password:bcrypt.hashSync(req.body.password,10),
        avatar  :req.body.avatar,
    }

    Usuario.create( user ).then( userDB => {
        const tokenUser = Token.getJWToken({
            _id: userDB._id,
            nombre:userDB.nombre,
            email:userDB.email,
            avatar:userDB.avatar
        });
        res.json({
            codeResponse:200,
            token:tokenUser,
            user:userDB
        })
    }).catch(err => {
        res.json({
            codeResponse:110,
            description:'NO_SE_PUDO_CREAR_USUARIO',
            user:err,
        })
    })
})
/**
 * @Listar
 */
usuariosRouter.get('/list',(req:Request, res:Response)=>{
        Usuario.find().then( userDB  =>{
            res.json({
                codeResponse:200,
                ok:true,
                user:userDB
            })
        })
})
/**
 * @Dar_de_baja
 */
usuariosRouter.post('/delete',verificarToken,(req: any, res : Response) => {
    const user = {
        existe : false
    }
    Usuario.findByIdAndUpdate( req.usuario._id, user, { new: true}, (err,userDB)=>{
        if(err) throw err;
        if(!userDB){
            res.json({
                
                ok:false,
                mensaje:'No se logro eliminar'
            })
        }else{
            res.json({
                codeResponse:200,
                ok:true,
                user:userDB
            })
        } 
    })
    
})
/**
 * @Actualizar
 */
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
                codeResponse:200,
                ok:true,
                token:tokenUser,
                user:userDB
            })
        } 
    })
})
/**
 * @Login
 */
usuariosRouter.post('/login',(req: Request, res : Response)=>{
    const body = req.body;
    Usuario.findOne({email: body.email},(err, userDB) => {
        if(err) throw err
        if(!userDB){
            return res.json({
                codeResponse:401,
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
                codeResponse:200,
                ok:true,
                token:tokenUser
            })
        }
    })
})
export default usuariosRouter



