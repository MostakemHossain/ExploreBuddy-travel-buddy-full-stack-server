import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { travelController } from "./travel.controller";
import { travelValidation } from "./travel.validation";
const router = express.Router();

router.post(
  "/:tripId/request",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(travelValidation.createTravelValidationSchema),
  travelController.createTravel
);

export const travelRoutes = router;
