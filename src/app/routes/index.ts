import express from "express";
import { travelRoutes } from "../modules/Travel/travel.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { tripRoutes } from "../modules/trips/trip.routes";
import { userRoutes } from "../modules/user/user.router";
import { contactRoutes } from "../modules/contact/contact.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: tripRoutes,
  },
  {
    path: "/",
    route: userRoutes,
  },
  {
    path: "/",
    route: authRoutes,
  },
  {
    path: "/trip",
    route: travelRoutes,
  },
  {
    path: "/contact",
    route: contactRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
