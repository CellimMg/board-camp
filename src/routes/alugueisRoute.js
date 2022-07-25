import { Router } from "express";
import { create, read, remove, update } from "../controllers/alugueisController.js";

const router = Router();


router.post("/rentals", create);
router.get("/rentals", read);
router.delete("/rentals/:id", remove);
router.post("/rentals/:id/return", update);


export default router;