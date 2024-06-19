"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
// CORS configuration
app.use((0, cors_1.default)({
    origin: "https://explore-buddy-travel-buddy-full-stack-client.vercel.app", // allow this origin
    methods: "GET, POST, PUT, DELETE, OPTIONS", // allowed methods
    allowedHeaders: "Content-Type, Authorization", // allowed headers
    credentials: true, // allow credentials such as cookies
}));
// Parser
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.send({
        message: "Explore Buddy API.............",
    });
});
// Global error handler
app.use(globalErrorHandler_1.default);
// Not found routes
app.use(notFound_1.default);
exports.default = app;
