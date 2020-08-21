"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../models/usuario");
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuariosRouter = express_1.Router();
usuariosRouter.post('/create', (req, res) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };
    usuario_1.Usuario.create(user).then(userDB => {
        res.json({
            ok: true,
            user: userDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            user: err
        });
    });
});
usuariosRouter.get('/list', (req, res) => {
    usuario_1.Usuario.find().then(userDB => {
        res.json({
            ok: false,
            user: userDB
        });
    });
});
usuariosRouter.post('/delete', (req, res) => {
});
usuariosRouter.post('/update', (req, res) => {
});
usuariosRouter.post('/login', (req, res) => {
    const body = req.body;
    usuario_1.Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'User / password incorrect !'
            });
        }
        if (userDB.compararPassword(body.password)) {
            res.json({
                ok: true,
                token: 'tokendeejemplo'
            });
        }
    });
});
exports.default = usuariosRouter;
