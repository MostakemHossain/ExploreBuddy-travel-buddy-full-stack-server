import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/register", userController.createUserRegistration);
router.get("/user", userController.getAllUser);

export const userRoutes = router;
