import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";
const router = express.Router();

router.post(
  "/login",
  validateRequest(authValidation.createUserLoginValidationSchema),
  authController.loginUser
);

router.post("/refresh-token", authController.refreshToken);
router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.USER, UserRole.SUPER_ADMIN),
  authController.changePassword
);

export const authRoutes = router;
