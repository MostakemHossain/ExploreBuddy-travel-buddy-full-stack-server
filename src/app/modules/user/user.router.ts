import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../../helpers/fileUpload";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/register",
  // validateRequest(userValidation.createUserValidationSchema),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createUserValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    return userController.createUserRegistration(req, res, next);
  }
);
router.get("/user", userController.getAllUser);

export const userRoutes = router;
