import express from "express";
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
