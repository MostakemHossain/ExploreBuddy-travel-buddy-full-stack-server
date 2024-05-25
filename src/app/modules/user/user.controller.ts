import { Request, Response } from "express";
import { userService } from "./user.service";

const createUserRegistration = async (req: Request, res: Response) => {
  const result = await userService.createUserRegistration(req.body);
  res.send({
    data: result,
  });
};

export const userController = {
  createUserRegistration,
};
