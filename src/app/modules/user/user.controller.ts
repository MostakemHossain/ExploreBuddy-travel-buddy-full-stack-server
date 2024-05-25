import { Request, Response } from "express";
import { userService } from "./user.service";

const createUserRegistration = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserRegistration(req.body);
    res.status(201).json({
      success: true,
      message: "User Registration Successfully",
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
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUser();
    res.status(200).json({
      success: true,
      message: "User Retrieved Successfully",
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

export const userController = {
  createUserRegistration,
  getAllUser,
};
