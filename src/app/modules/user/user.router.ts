import { UserRole } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../../helpers/fileUpload";
import auth from "../../middlewares/auth";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/register",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createUserValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    return userController.createUserRegistration(req, res, next);
  }
);
router.get("/user", userController.getAllUser);
router.get(
  "/profile",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  userController.getMyProfile
);
router.patch(
  "/profile/update-my-profile",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return userController.updateMyProfile(req, res, next);
  }
);
router.patch(
  "/user/update-role-status/:userId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  userController.updateUserRoleStatus
);

export const userRoutes = router;
