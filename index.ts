import Server from './server/server'
import usuariosRouter from './routes/usuarios';
import tiendasRouter from './routes/tiendas'
import mongoose, { Mongoose } from 'mongoose'
import bodyParser from 'body-parser';
import * as cors from 'cors';
const keys = require ('./enviroments/enviroment')

const server = new Server();
const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin:'http://localhost:3000',
    preflightContinue: false,
  };
server.app.use(bodyParser.urlencoded({extended:true}))
server.app.use(bodyParser.json())
server.app.use('/usuarios',usuariosRouter)
server.app.use('/tiendas',tiendasRouter)
const URL = keys.mongoURI
//conectar a ddbb

//prueba git

mongoose.connect(URL,
    {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false,useCreateIndex: false},(error) =>{
        if(error) throw error;
        console.log('Db connected')
})

server.start(()=>{
    console.log('server ok')
})