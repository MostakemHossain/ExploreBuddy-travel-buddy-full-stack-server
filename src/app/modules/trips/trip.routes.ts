import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { tripController } from "./trip.controller";
const router = express.Router();

router.post("/trips", auth(UserRole.USER), tripController.createTrip);
router.get("/trips", tripController.getAllTrip);
router.get(
  "/trips/my-trips",
  auth(UserRole.USER),
  tripController.getSpecificUserTrip
);
router.delete(
  "/trips/my-trips/:id",
  auth(UserRole.USER),
  tripController.deleteMyTrip
);

export const tripRoutes = router;
