import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/status", (req: Request, res: Response) => {
  res.send({ status: "ok" });
});

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
