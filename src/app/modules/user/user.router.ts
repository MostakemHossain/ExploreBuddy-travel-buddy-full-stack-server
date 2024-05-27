import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidation.createUserValidationSchema),
  userController.createUserRegistration
);
router.get("/user", userController.getAllUser);

export const userRoutes = router;
