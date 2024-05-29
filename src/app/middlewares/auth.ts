import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../error/AppError";
import { jwtHelpers } from "../../helpers/jwtHelpers";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      const verifyUser = jwtHelpers.verifyToken(
        token,
        config.jwt_access_serect as string
      );
      req.user = verifyUser;
      if (roles.length && !roles.includes(verifyUser.role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
export default auth;
