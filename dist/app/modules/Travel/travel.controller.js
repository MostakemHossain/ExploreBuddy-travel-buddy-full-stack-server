"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.travelController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const Pick_1 = __importDefault(require("../../../Shared/Pick"));
const SendResponse_1 = __importDefault(require("../../../Shared/SendResponse"));
const catchAsync_1 = __importDefault(require("../../../Shared/catchAsync"));
const trip_constant_1 = __importDefault(require("../trips/trip.constant"));
const travel_service_1 = require("./travel.service");
const createTravel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield travel_service_1.travelService.createTravel(req.params.tripId, req.body.userId);
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        message: "Travel created successfully",
        success: true,
        data: result,
    });
}));
const getPotentialTravelBuddies = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield travel_service_1.travelService.getPotentialTravelBuddies(req.params.tripId);
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        message: "Get Potential Travel Buddies retrieved successfully",
        success: true,
        data: result,
    });
}));
const updateSpecificTravelBuddy = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield travel_service_1.travelService.updateSpecificTravelBuddy(req.params.buddyId, req.body);
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: "Travel buddy request update successfully",
        success: true,
        data: result,
    });
}));
const getAllTravelRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield travel_service_1.travelService.getAllTravelRequest();
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: "Get All Travel Request Retrieved Successfully",
        success: true,
        data: result,
    });
}));
const getAllApprovalTravelRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, Pick_1.default)(req.query, trip_constant_1.default);
    console.log(req.query);
    const options = (0, Pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield travel_service_1.travelService.getAllApprovalTravelRequest(filter, options);
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: "Get All Travel Request Retrieved Successfully",
        success: true,
        data: result,
    });
}));
const getSpecificUserTripRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield travel_service_1.travelService.getSpecificUserTripRequest(req.params.userId);
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        message: "Specific User Trip Request Retrieved Successfully",
        success: true,
        data: result,
    });
}));
exports.travelController = {
    createTravel,
    getPotentialTravelBuddies,
    updateSpecificTravelBuddy,
    getSpecificUserTripRequest,
    getAllTravelRequest,
    getAllApprovalTravelRequest,
};
