import express from "express";
import categoriesRoute from "./routes/categoriasRoutes.js";
import jogosRoute from "./routes/jogosRoutes.js";
import clientesRoute from "./routes/clientesRoutes.js";
import alugueisRoute from "./routes/alugueisRoute.js";
const app = express();

app.use(express.json());
app.use(categoriesRoute);
app.use(jogosRoute);
app.use(clientesRoute);
app.use(alugueisRoute);



app.listen(4000, () => console.log("Server running!"));