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
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
    ],
    credentials: true,
  })
);
app.all("*", (req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://explore-buddy-travel-buddy-full-stack-client.vercel.app"
  );
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
