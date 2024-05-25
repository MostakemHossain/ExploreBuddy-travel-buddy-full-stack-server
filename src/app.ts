import cors from "cors";
import express, { Application, Request, Response } from "express";

const port = 6000;
const app: Application = express();

// PARSER
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Explore Buddy API.............",
  });
});

export default app;
