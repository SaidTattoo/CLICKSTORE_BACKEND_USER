import jwt from 'jsonwebtoken'

export default class Token{

    private static seed:string = "seed-de-clickstore-app";
    private static caducidad: string ="1d";

    constructor(){}

    static getJWToken(payload:any):string{
        return jwt.sign({
            usuario:payload
        },this.seed,{
            expiresIn:this.caducidad
        })
    }

    static comprobarToken(userToken: string){
        return new Promise((resolve,rejects)=>{
            jwt.verify( userToken ,this.seed,(err, decoded)=>{
                if(err){
                    rejects();
                }else{
                    resolve(decoded) 
                }
            })
        })
        
    }
}