import { Schema, model,Document } from "mongoose";
import   bcrypt    from 'bcrypt'
const usuarioSchema = new Schema({
    nombre:{
        type:String,
        required: true
    },
    avatar:{
        type:String,
        default: 'av-1.png'
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    existe: {
        type:Boolean,
        default:true
    }
})
usuarioSchema.method('compararPassword',function(password:string = ''){
    if(bcrypt.compareSync(password, this.password)){
        return true;
    }else{
        return false;
    }
})
interface IUsuario extends Document{

    nombre:string,
    email:string,
    avatar?:string,
    password:string,
    

    compararPassword(password:string): boolean
}

export const Usuario = model<IUsuario>('Usuario', usuarioSchema)