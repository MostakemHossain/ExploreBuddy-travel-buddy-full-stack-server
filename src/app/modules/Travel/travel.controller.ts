import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../Shared/SendResponse";
import catchAsync from "../../../Shared/catchAsync";
import { travelService } from "./travel.service";

const createTravel = catchAsync(async (req: Request, res: Response) => {
  const result = await travelService.createTravel(
    req.params.tripId,
    req.body.userId
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Travel created successfully",
    success: true,
    data: result,
  });
});
export const travelController = {
  createTravel,
};
