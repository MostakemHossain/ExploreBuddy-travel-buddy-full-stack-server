"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const travel_routes_1 = require("../modules/Travel/travel.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const contact_routes_1 = require("../modules/contact/contact.routes");
const team_routes_1 = require("../modules/team/team.routes");
const trip_routes_1 = require("../modules/trips/trip.routes");
const user_router_1 = require("../modules/user/user.router");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/",
        route: trip_routes_1.tripRoutes,
    },
    {
        path: "/",
        route: user_router_1.userRoutes,
    },
    {
        path: "/",
        route: auth_routes_1.authRoutes,
    },
    {
        path: "/trip",
        route: travel_routes_1.travelRoutes,
    },
    {
        path: "/contact",
        route: contact_routes_1.contactRoutes,
    },
    {
        path: "/team",
        route: team_routes_1.teamRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
