import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
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
};
