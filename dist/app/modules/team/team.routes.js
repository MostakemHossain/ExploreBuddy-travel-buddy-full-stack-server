"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const fileUpload_1 = require("../../../helpers/fileUpload");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const team_controller_1 = require("./team.controller");
const router = express_1.default.Router();
router.post("/create-a-team-member", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), fileUpload_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return team_controller_1.teamController.createATeamMember(req, res, next);
});
router.get("/", team_controller_1.teamController.getAllTeamMember);
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), team_controller_1.teamController.deleteATeamMember);
router.get("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), team_controller_1.teamController.getATeamMember);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), fileUpload_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return team_controller_1.teamController.updateATeamMember(req, res, next);
});
exports.teamRoutes = router;
