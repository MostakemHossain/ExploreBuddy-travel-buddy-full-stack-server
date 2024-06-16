"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.travelRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const travel_controller_1 = require("./travel.controller");
const travel_validation_1 = require("./travel.validation");
const router = express_1.default.Router();
router.post("/:tripId/request", (0, auth_1.default)(client_1.UserRole.USER), (0, validateRequest_1.default)(travel_validation_1.travelValidation.createTravelValidationSchema), travel_controller_1.travelController.createTravel);
router.patch("/travel-buddies/:buddyId/respond", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), travel_controller_1.travelController.updateSpecificTravelBuddy);
router.get("/travel-buddies/:userId", (0, auth_1.default)(client_1.UserRole.USER), travel_controller_1.travelController.getSpecificUserTripRequest);
router.get("/travel-request", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), travel_controller_1.travelController.getAllTravelRequest);
router.get("/travel-request/approval", travel_controller_1.travelController.getAllTravelRequest);
exports.travelRoutes = router;
