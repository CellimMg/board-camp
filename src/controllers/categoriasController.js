import { read as readP } from "../providers/categoriasProvider.js";

export function read(_, res) {
    const categorias = readP;
    res.status(200).send({ categorias: categorias });
}