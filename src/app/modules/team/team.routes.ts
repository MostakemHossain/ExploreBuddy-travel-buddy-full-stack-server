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
router.get("/", teamController.getAllTeamMember);
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  teamController.deleteATeamMember
);
router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  teamController.getATeamMember
);
router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return teamController.updateATeamMember(req, res, next);
  }
);

export const teamRoutes = router;
