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
exports.teamServices = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../error/AppError"));
const fileUpload_1 = require("../../../helpers/fileUpload");
const prisma = new client_1.PrismaClient();
const createATeamMember = (user, req) => __awaiter(void 0, void 0, void 0, function* () {
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
    req.body.facebookURL = req.body.facebook;
    req.body.instagramURL = req.body.instagram;
    req.body.linkedinURL = req.body.linkedin;
    delete req.body.facebook;
    delete req.body.instagram;
    delete req.body.linkedin;
    const result = yield prisma.team.create({
        data: req.body,
    });
    return result;
});
const getAllTeamMember = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.team.findMany({});
    return result;
});
const deleteATeamMember = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.team.delete({
        where: {
            id,
        },
    });
    return result;
});
const updateATeamMember = (id, req) => __awaiter(void 0, void 0, void 0, function* () {
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
    req.body.facebookURL = req.body.facebook;
    req.body.instagramURL = req.body.instagram;
    req.body.linkedinURL = req.body.linkedin;
    delete req.body.facebook;
    delete req.body.instagram;
    delete req.body.linkedin;
    const result = yield prisma.team.update({
        where: {
            id,
        },
        data: req.body,
    });
    return result;
});
const getATeamMember = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.team.findUniqueOrThrow({
        where: {
            id,
        },
    });
    return result;
});
exports.teamServices = {
    createATeamMember,
    getAllTeamMember,
    deleteATeamMember,
    getATeamMember,
    updateATeamMember,
};
