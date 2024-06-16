"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const trip_controller_1 = require("./trip.controller");
const router = express_1.default.Router();
router.post("/trips", (0, auth_1.default)(client_1.UserRole.USER), trip_controller_1.tripController.createTrip);
router.get("/trips/all-trips", trip_controller_1.tripController.getAllTrip);
router.get("/trips/my-trips", (0, auth_1.default)(client_1.UserRole.USER), trip_controller_1.tripController.getSpecificUserTrip);
router.delete("/trips/my-trips/:id", (0, auth_1.default)(client_1.UserRole.USER), trip_controller_1.tripController.deleteMyTrip);
router.get("/trips/my-trips/:id", trip_controller_1.tripController.getMyTrip);
router.patch("/trips/my-trips/:id", (0, auth_1.default)(client_1.UserRole.USER), trip_controller_1.tripController.updateMyTrip);
exports.tripRoutes = router;
