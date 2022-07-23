import { Router } from "express";
import { create, read } from "../controllers/categoriasController.js";

const route = Router();
route.get("/categories", read);
route.post("/categories", create);
export default route;