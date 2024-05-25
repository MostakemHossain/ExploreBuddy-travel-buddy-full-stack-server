import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../Shared/SendResponse";
import { userService } from "./user.service";

const createUserRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userService.createUserRegistration(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Registration Successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};
const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getAllUser();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Retrieved Successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const userController = {
  createUserRegistration,
  getAllUser,
};
