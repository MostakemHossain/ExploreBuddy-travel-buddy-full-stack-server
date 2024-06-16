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
exports.userController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const SendResponse_1 = __importDefault(require("../../../Shared/SendResponse"));
const catchAsync_1 = __importDefault(require("../../../Shared/catchAsync"));
const user_service_1 = require("./user.service");
const createUserRegistration = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.createUserRegistration(req);
    (0, SendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "User Registration Successfully",
        data: result,
    });
}));
const getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getAllUser();
    (0, SendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User Retrieved Successfully",
        data: result,
    });
}));
const getMyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield user_service_1.userService.getMyProfile(user);
    (0, SendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User Retrieved Successfully",
        data: result,
    });
}));
const updateMyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield user_service_1.userService.updateMyProfile(user, req);
    (0, SendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "My Profile Updated Successfully",
        data: result,
    });
}));
const updateUserRoleStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.updateUserRoleStatus(req.params.userId, req.body);
    (0, SendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Updated User Role,status Successfully",
        data: result,
    });
}));
exports.userController = {
    createUserRegistration,
    getAllUser,
    getMyProfile,
    updateMyProfile,
    updateUserRoleStatus,
};
