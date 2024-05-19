import { Router } from "express";
import {
  createVehicle,
  deleteVehicle,
  getAllVehicles,
  updateVehicle,
} from "../controller/vehicleController";

const router = Router();

router.get("/", getAllVehicles);
router.post("/", createVehicle);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

export default router;
