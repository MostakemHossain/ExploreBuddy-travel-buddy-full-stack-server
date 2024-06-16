"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    port: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    db_url: process.env.DATABASE_URL,
    jwt_access_serect: process.env.JWT_ACCESS_SERECT,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_serect: process.env.JWT_REFRESH_SERECT,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
    reset_password_token: process.env.RESET_PASSWORD_TOKEN,
    reset_password_token_expires_in: process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN,
    reset_password_link: process.env.RESET_PASSWORD_LINK,
    emailSender: {
        email: process.env.EMAIL,
        app_password: process.env.APP_PASSWORD,
    },
    cloudinary_cloud_name: process.env.CLOUD_NAME,
    cloudinary_api_key: process.env.API_KEY,
    cloudinary_api_serect: process.env.API_SECRET,
};
