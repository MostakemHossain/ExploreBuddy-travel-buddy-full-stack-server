"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelpers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload, serect, expiresIn) => {
    const token = jsonwebtoken_1.default.sign(payload, serect, {
        expiresIn: expiresIn,
        algorithm: "HS256",
    });
    return token;
};
const verifyToken = (token, serect) => {
    return jsonwebtoken_1.default.verify(token, serect);
};
exports.jwtHelpers = {
    generateToken,
    verifyToken,
};
