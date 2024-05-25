import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./app/routes";

const port = 6000;
const app: Application = express();

// PARSER
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Explore Buddy API.............",
  });
});

export default app;
