import { Schema, model,Document } from "mongoose";
const universidadesSchema = new Schema({
    nombre:String,
    existe: {
        type:Boolean,
        default:true
    }
})
interface IUniversidades extends Document{

    nombre:string,
}

export const Universidades = model<IUniversidades>('Universidades', universidadesSchema)