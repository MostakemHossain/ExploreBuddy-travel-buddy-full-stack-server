import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../Shared/SendResponse";
import catchAsync from "../../../Shared/catchAsync";

import { userService } from "./user.service";

export interface CustomRequest extends Request {
  user?: any;
  // file?: IFile;
}
const createUserRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result = await userService.createUserRegistration(req);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Registration Successfully",
      data: result,
    });
  }
);
const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUser();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Retrieved Successfully",
    data: result,
  });
});
const getMyProfile = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await userService.getMyProfile(user);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Retrieved Successfully",
      data: result,
    });
  }
);
const updateMyProfile = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const user = req.user;
    const result = await userService.updateMyProfile(user, req);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "My Profile Updated Successfully",
      data: result,
    });
  }
);
const updateUserRoleStatus = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const result = await userService.updateUserRoleStatus(
      req.params.userId,
      req.body
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Updated User Role,status Successfully",
      data: result,
    });
  }
);

export const userController = {
  createUserRegistration,
  getAllUser,
  getMyProfile,
  updateMyProfile,
  updateUserRoleStatus,
};
