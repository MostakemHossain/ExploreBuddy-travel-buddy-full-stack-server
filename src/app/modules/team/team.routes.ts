import { UserRole } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../../helpers/fileUpload";
import auth from "../../middlewares/auth";
import { teamController } from "./team.controller";
const router = express.Router();
router.post(
  "/create-a-team-member",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return teamController.createATeamMember(req, res, next);
  }
);

export const teamRoutes = router;
