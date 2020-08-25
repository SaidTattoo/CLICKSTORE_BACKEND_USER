"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server/server"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const tiendas_1 = __importDefault(require("./routes/tiendas"));
const universidades_1 = __importDefault(require("./routes/universidades"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
//swagger 
const cors = require('cors');
const keys = require('./enviroments/enviroment');
const server = new server_1.default();
server.app.use(cors());
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
server.app.use('/usuarios', usuarios_1.default);
server.app.use('/tiendas', tiendas_1.default);
server.app.use('/universidades', universidades_1.default);
const URL = keys.mongoURI;
//conectar a ddbb
//prueba git
mongoose_1.default.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: false }, (error) => {
    if (error)
        throw error;
    console.log('Db connected');
});
server.start(() => {
    console.log('server ok');
});
