import express from "express";
import { travelRoutes } from "../modules/Travel/travel.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { contactRoutes } from "../modules/contact/contact.routes";
import { teamRoutes } from "../modules/team/team.routes";
import { tripRoutes } from "../modules/trips/trip.routes";
import { userRoutes } from "../modules/user/user.router";

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
  {
    path: "/team",
    route: teamRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
