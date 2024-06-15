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
export const contactController = {
  createContact,
};
