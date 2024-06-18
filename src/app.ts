import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,  Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

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
