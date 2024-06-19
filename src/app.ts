import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();

// CORS configuration
app.use(
  cors({
    origin: "https://explore-buddy-travel-buddy-full-stack-client.vercel.app", // allow this origin
    methods: "GET, POST, PUT, DELETE, OPTIONS", // allowed methods
    allowedHeaders: "Content-Type, Authorization", // allowed headers
    credentials: true, // allow credentials such as cookies
  })
);

// Parser
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Explore Buddy API.............",
  });
});

// Global error handler
app.use(globalErrorHandler);

// Not found routes
app.use(notFound);

export default app;
