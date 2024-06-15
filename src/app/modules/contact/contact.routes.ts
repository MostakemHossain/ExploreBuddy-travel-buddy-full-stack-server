import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { contactController } from "./contact.controller";
import { contactValidation } from "./contact.validation";
const router = express.Router();

router.post(
  "/create-contact",
  validateRequest(contactValidation.createContactValidationSchema),
  contactController.createContact
);
router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  contactController.getAllContact
);

export const contactRoutes = router;
