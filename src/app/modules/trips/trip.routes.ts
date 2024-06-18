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
router.get("/trips/all-trips", tripController.getAllTrip);
router.get(
  "/trips/my-trips",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  tripController.getSpecificUserTrip
);
router.delete(
  "/trips/my-trips/:id",
  auth(UserRole.USER),
  tripController.deleteMyTrip
);
router.get("/trips/my-trips/:id", tripController.getMyTrip);
router.patch(
  "/trips/my-trips/:id",
  auth(UserRole.USER),
  tripController.updateMyTrip
);

export const tripRoutes = router;
