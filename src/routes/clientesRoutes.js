import { Router } from "express";
import { read, readById, create, update } from "../controllers/clientesController.js";

const router = Router();

router.get("/customers", read);
router.get("/customers/:id", readById);
router.post("/customers", create)
router.put("/customers/:id", update)

export default router;