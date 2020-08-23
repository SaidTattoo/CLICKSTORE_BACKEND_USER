import { Schema, model,Document } from "mongoose";
const tiendaSchema = new Schema({
    nombre:String,
    categoria:String,
    existe:String
})
interface ITienda extends Document{

    nombre:string,
    categoria:string,

}

export const Tienda = model<ITienda>('Tienda', tiendaSchema)