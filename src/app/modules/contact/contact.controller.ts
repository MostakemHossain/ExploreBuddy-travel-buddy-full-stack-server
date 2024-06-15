import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../Shared/SendResponse";
import catchAsync from "../../../Shared/catchAsync";
import { contactServices } from "./contact.service";

const createContact = catchAsync(async (req: Request, res: Response) => {
  const result = await contactServices.createContact(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Change password successfully",
    data: result,
  });
});
const getAllContact = catchAsync(async (req: Request, res: Response) => {
  const result = await contactServices.getAllContact();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "get All contact retrieved successfully",
    data: result,
  });
});
export const contactController = {
  createContact,
  getAllContact,
};
