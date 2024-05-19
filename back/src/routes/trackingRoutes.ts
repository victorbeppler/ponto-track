import { Router } from "express";
import { createTracking, deleteTracking, getAllTrackings, updateTracking } from "../controller/trackingController";

const router = Router();

router.get("/", getAllTrackings);
router.post("/", createTracking);
router.put("/:id", updateTracking);
router.delete("/:id", deleteTracking);

export default router;
