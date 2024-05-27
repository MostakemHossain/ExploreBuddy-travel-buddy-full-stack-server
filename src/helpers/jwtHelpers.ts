import jwt, { JwtPayload, Secret } from "jsonwebtoken";
const generateToken = (payload: any, serect: Secret, expiresIn: string) => {
  const token = jwt.sign(payload, serect, {
    expiresIn: expiresIn,
    algorithm: "HS256",
  });

  return token;
};

const verifyToken = (token: string, serect: Secret) => {
  return jwt.verify(token, serect) as JwtPayload;
};
export const jwtHelpers = {
  generateToken,
  verifyToken,
};
