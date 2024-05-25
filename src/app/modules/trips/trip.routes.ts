import express from "express";
import { tripController } from "./trip.controller";
const router = express.Router();

router.post("/trips", tripController.createTrip);
router.get("/trips", tripController.getAllTrip);

export const tripRoutes = router;
