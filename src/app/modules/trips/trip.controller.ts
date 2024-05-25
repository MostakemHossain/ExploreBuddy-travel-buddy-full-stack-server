import { Request, Response } from "express";
import Pick from "../../../Shared/Pick";
import tripFilterableFields from "./trip.constant";
import { tripService } from "./trips.service";

const createTrip = async (req: Request, res: Response) => {
  try {
    const result = await tripService.createTrip(req.body);
    res.status(200).json({
      success: true,
      message: "Trip Created Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};
const getAllTrip = async (req: Request, res: Response) => {
  try {
    const filter = Pick(req.query, tripFilterableFields);
    const options = Pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await tripService.getAllTrip(filter, options);
    res.status(200).json({
      success: true,
      message: "Trip Retrieved Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

export const tripController = {
  createTrip,
  getAllTrip,
};
