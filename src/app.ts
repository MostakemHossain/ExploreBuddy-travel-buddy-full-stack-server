import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();

app.use(
  cors({
    origin: "https://explore-buddy-travel-buddy-full-stack-client.vercel.app",
    credentials: true,
  })
);

app.use(cookieParser());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
