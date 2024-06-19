import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();
const allowedOrigins = [
  "https://explore-buddy-travel-buddy-full-stack-client.vercel.app", // Add other allowed origins here
];
app.use(function (req, res, next) {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
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

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
