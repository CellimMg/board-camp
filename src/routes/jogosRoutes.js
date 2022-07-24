import { Router } from "express";
import { create, read } from "../controllers/jogosController.js";

const route = Router();


route.get("/games", read);
route.post("/games", create);


export default route;