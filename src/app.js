import express from "express";
import categoriesRoute from "./routes/categoriasRoutes.js";

const app = express();

app.use(categoriesRoute);

app.listen(4000, () => console.log("Server running!"));