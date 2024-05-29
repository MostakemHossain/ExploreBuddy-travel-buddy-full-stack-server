import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { tripController } from "./trip.controller";
const router = express.Router();

router.post(
  "/trips",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  tripController.createTrip
);
router.get("/trips", tripController.getAllTrip);

export const tripRoutes = router;
