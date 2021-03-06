
import Server from './server/server'
import usuariosRouter from './routes/usuarios';
import tiendasRouter from './routes/tiendas'
import universidadRouter from './routes/universidades'
import mongoose, { Mongoose } from 'mongoose'
import bodyParser from 'body-parser';
//swagger 


const cors = require('cors');
const keys = require ('./enviroments/enviroment')

const server = new Server();

server.app.use(cors())



server.app.use(bodyParser.urlencoded({extended:true}))
server.app.use(bodyParser.json())
server.app.use('/usuarios',usuariosRouter)
server.app.use('/tiendas',tiendasRouter)
server.app.use('/universidades',universidadRouter)
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