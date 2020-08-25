import express  from 'express'
import swaggerUI from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json'

    export default class Server{
        
     
        public app :express.Application;
        public port:number = 3000;

        constructor( ){
            this.app = express();
        }

        start( callback: () => void ) {
            this.app.listen(this.port, callback );
            this.app.use('/swagger', swaggerUI.serve,swaggerUI.setup(swaggerDocument))
        }
}