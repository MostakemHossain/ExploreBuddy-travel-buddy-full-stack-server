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
const getPotentialTravelBuddies = catchAsync(
  async (req: Request, res: Response) => {
    const result = await travelService.getPotentialTravelBuddies(
      req.params.tripId
    );
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: "Get Potential Travel Buddies retrieved successfully",
      success: true,
      data: result,
    });
  }
);
const updateSpecificTravelBuddy = catchAsync(
  async (req: Request, res: Response) => {
    const result = await travelService.updateSpecificTravelBuddy(
      req.params.buddyId,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: "Travel buddy request update successfully",
      success: true,
      data: result,
    });
  }
);
const getSpecificUserTripRequest = catchAsync(
  async (req: Request, res: Response) => {
    const result = await travelService.getSpecificUserTripRequest(
      req.params.userId
    );
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: "Specific User Trip Request Retrieved Successfully",
      success: true,
      data: result,
    });
  }
);
export const travelController = {
  createTravel,
  getPotentialTravelBuddies,
  updateSpecificTravelBuddy,
  getSpecificUserTripRequest,
};
