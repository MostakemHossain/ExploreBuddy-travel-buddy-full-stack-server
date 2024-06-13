import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { travelController } from "./travel.controller";
import { travelValidation } from "./travel.validation";
const router = express.Router();

router.post(
  "/:tripId/request",
  auth(UserRole.USER),
  validateRequest(travelValidation.createTravelValidationSchema),
  travelController.createTravel
);

router.patch(
  "/travel-buddies/:buddyId/respond",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  travelController.updateSpecificTravelBuddy
);
router.get(
  "/travel-buddies/:userId",
  auth(UserRole.USER),
  travelController.getSpecificUserTripRequest
);
router.get(
  "/travel-request",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  travelController.getAllTravelRequest
);

export const travelRoutes = router;
