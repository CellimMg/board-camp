import { Router } from "express";
import { read } from "../controllers/categoriasController.js";

const route = Router();
route.get("/categories", read);

export default route;