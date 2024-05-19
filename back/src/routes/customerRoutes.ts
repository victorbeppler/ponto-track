import { Router } from "express";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  updateCustomer,
} from "../controller/customerController";

const router = Router();

router.get("/", getAllCustomers);
router.post("/", createCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
