"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    universidad: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    existe: {
        type: Boolean,
        default: true
    }
});
usuarioSchema.method('compararPassword', function (password = '') {
    if (bcrypt_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
exports.Usuario = mongoose_1.model('Usuario', usuarioSchema);
