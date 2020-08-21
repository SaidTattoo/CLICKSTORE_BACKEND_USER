import Server from './server/server'
import usuariosRouter from './routes/usuarios';
import mongoose, { Mongoose } from 'mongoose'
import bodyParser from 'body-parser';

const keys = require ('./enviroments/enviroment')

const server = new Server();

server.app.use(bodyParser.urlencoded({extended:true}))
server.app.use(bodyParser.json())
server.app.use('/usuarios',usuariosRouter)

const URL = keys.mongoURI
//conectar a ddbb

//prueba git

mongoose.connect(URL,
    {useNewUrlParser: true, useUnifiedTopology: true},(error) =>{
        if(error) throw error;
        console.log('Db connected')
})

server.start(()=>{
    console.log('server ok')
})