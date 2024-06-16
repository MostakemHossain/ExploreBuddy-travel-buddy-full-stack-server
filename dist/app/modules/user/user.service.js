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
exports.userService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../error/AppError"));
const fileUpload_1 = require("../../../helpers/fileUpload");
const prisma = new client_1.PrismaClient();
const createUserRegistration = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (file) {
        const uploadToCloudinary = yield fileUpload_1.fileUploader.uploadToCloudinary(file);
        req.body.profilePhoto = uploadToCloudinary === null || uploadToCloudinary === void 0 ? void 0 : uploadToCloudinary.secure_url;
    }
    const userExists = yield prisma.user.findUnique({
        where: {
            email: req.body.email,
        },
    });
    if (userExists) {
        throw new Error("This email is already registered");
    }
    const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        profilePhoto: req.body.profilePhoto,
    };
    const result = yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const createUser = yield tx.user.create({
            data: userData,
            select: {
                id: true,
                name: true,
                email: true,
                profilePhoto: true,
                password: true,
                status: true,
                role: true,
                isDeleted: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return createUser;
    }));
    return result;
});
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findMany({
        where: {},
        select: {
            id: true,
            name: true,
            email: true,
            profilePhoto: true,
            status: true,
            role: true,
            isDeleted: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
const getMyProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma.user.findUniqueOrThrow({
        where: {
            id: user.userId,
        },
    });
    return userData;
});
const updateMyProfile = (user, req) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma.user.findUnique({
        where: {
            id: user.userId,
            status: user.ACTIVE,
        },
    });
    if (!userData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User does not exist!");
    }
    const file = req.file;
    if (file) {
        const uploadedProfileImage = yield fileUpload_1.fileUploader.uploadToCloudinary(file);
        if (uploadedProfileImage && uploadedProfileImage.secure_url) {
            req.body.profilePhoto = uploadedProfileImage.secure_url;
        }
        else {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Profile image upload failed!");
        }
    }
    const result = yield prisma.user.update({
        where: {
            email: user.email,
        },
        data: req.body,
    });
    return result;
});
const updateUserRoleStatus = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.update({
        where: {
            id: userId,
        },
        data: payload,
    });
    return result;
});
exports.userService = {
    createUserRegistration,
    getAllUser,
    getMyProfile,
    updateMyProfile,
    updateUserRoleStatus,
};
