import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../Shared/SendResponse";
import catchAsync from "../../../Shared/catchAsync";
import { teamServices } from "./team.services";

const createATeamMember = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await teamServices.createATeamMember(user, req);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Team member created successfully",
      data: result,
    });
  }
);
const getAllTeamMember = catchAsync(async (req, res: Response) => {
  const result = await teamServices.getAllTeamMember();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team members are Retrieved successfully",
    data: result,
  });
});
const deleteATeamMember = catchAsync(async (req, res: Response) => {
  const result = await teamServices.deleteATeamMember(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team member is Deleted successfully",
    data: result,
  });
});

export const teamController = {
  createATeamMember,
  getAllTeamMember,
  deleteATeamMember,
};
