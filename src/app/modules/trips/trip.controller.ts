import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import Pick from "../../../Shared/Pick";
import sendResponse from "../../../Shared/SendResponse";
import tripFilterableFields from "./trip.constant";
import { tripService } from "./trips.service";

const createTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await tripService.createTrip(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Trip Created Successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};
const getAllTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter = Pick(req.query, tripFilterableFields);
    const options = Pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await tripService.getAllTrip(filter, options);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Trip Retrieved Successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error: any) {
    next(error);
  }
};

export const tripController = {
  createTrip,
  getAllTrip,
};
