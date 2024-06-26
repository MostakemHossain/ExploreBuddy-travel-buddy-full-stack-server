import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import Pick from "../../../Shared/Pick";
import sendResponse from "../../../Shared/SendResponse";
import catchAsync from "../../../Shared/catchAsync";
import tripFilterableFields from "./trip.constant";
import { tripService } from "./trips.service";

const createTrip = catchAsync(
  async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const result = await tripService.createTrip(req.body, req.user.userId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Trip Created Successfully",
      data: result,
    });
  }
);
const getAllTrip = catchAsync(async (req: Request, res: Response) => {
  const filter = Pick(req.query, tripFilterableFields);
  const options = Pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await tripService.getAllTrip(filter, options);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Trip Retrieved Successfully",
    data: result.data,
  });
});
const getSpecificUserTrip = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const filter = Pick(req.query, tripFilterableFields);
    const options = Pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await tripService.getSpecificUserTrip(
      req.user.userId,
      filter,
      options
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Get Specific User Trip Retrieved Successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);
const deleteMyTrip = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await tripService.deleteMyTrip(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Trip Deleted Successfully",
      data: result,
    });
  }
);
const getMyTrip = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await tripService.getMyTrip(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Trip Retrieved Successfully",
      data: result,
    });
  }
);
const updateMyTrip = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await tripService.updateMyTrip(req.params.id, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Trip Updated Successfully",
      data: result,
    });
  }
);

export const tripController = {
  createTrip,
  getAllTrip,
  getSpecificUserTrip,
  deleteMyTrip,
  getMyTrip,
  updateMyTrip,
};
