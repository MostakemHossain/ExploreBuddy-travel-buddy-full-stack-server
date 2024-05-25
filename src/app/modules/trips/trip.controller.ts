import { Request, Response } from "express";
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
    const result = await tripService.getAllTrip(req.query);
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
