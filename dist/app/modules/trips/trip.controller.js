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
exports.tripController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const Pick_1 = __importDefault(require("../../../Shared/Pick"));
const SendResponse_1 = __importDefault(require("../../../Shared/SendResponse"));
const catchAsync_1 = __importDefault(require("../../../Shared/catchAsync"));
const trip_constant_1 = __importDefault(require("./trip.constant"));
const trips_service_1 = require("./trips.service");
const createTrip = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trips_service_1.tripService.createTrip(req.body, req.user.userId);
    (0, SendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Trip Created Successfully",
        data: result,
    });
}));
const getAllTrip = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, Pick_1.default)(req.query, trip_constant_1.default);
    const options = (0, Pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield trips_service_1.tripService.getAllTrip(filter, options);
    (0, SendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Trip Retrieved Successfully",
        data: result.data,
    });
}));
const getSpecificUserTrip = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, Pick_1.default)(req.query, trip_constant_1.default);
    const options = (0, Pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield trips_service_1.tripService.getSpecificUserTrip(req.user.userId, filter, options);
    (0, SendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Get Specific User Trip Retrieved Successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const deleteMyTrip = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trips_service_1.tripService.deleteMyTrip(req.params.id);
    (0, SendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Trip Deleted Successfully",
        data: result,
    });
}));
const getMyTrip = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trips_service_1.tripService.getMyTrip(req.params.id);
    (0, SendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Trip Retrieved Successfully",
        data: result,
    });
}));
const updateMyTrip = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trips_service_1.tripService.updateMyTrip(req.params.id, req.body);
    (0, SendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Trip Updated Successfully",
        data: result,
    });
}));
exports.tripController = {
    createTrip,
    getAllTrip,
    getSpecificUserTrip,
    deleteMyTrip,
    getMyTrip,
    updateMyTrip,
};
