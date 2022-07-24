import { Router } from "express";
import { read, readById, create } from "../controllers/clientesController.js";

const router = Router();

router.get("/customers", read);
router.get("/customers/:id", readById);
router.post("/customers", create)

export default router;