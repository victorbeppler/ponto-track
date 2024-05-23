import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import customerRoutes from "./routes/customerRoutes";
import vehicleRoutes from "./routes/vehicleRoutes";
import trackingRoutes from "./routes/trackingRoutes";
import { authenticateToken } from "./middleware/authMiddleware";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/status", (req: Request, res: Response) => {
  res.send({ status: "ok" });
});
app.use("/users", userRoutes);
app.use("/customers", customerRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/trackings", trackingRoutes);

const PORT = 7015;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
