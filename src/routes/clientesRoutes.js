import { Router } from "express";
import { read } from "../controllers/clientesController.js";

const router = Router();

router.get("/customers", read);
router.get("/customers/:id", read);


export default router;