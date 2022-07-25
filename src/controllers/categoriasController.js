import categoria from "../models/categoriasModel.js";
import { read as readP, create as createP } from "../providers/categoriasProvider.js";

export async function read(_, res) {
    try {
        const categorias = await readP();
        res.status(200).send(categorias);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function create(req, res) {
    try {
        const category = req.body;
        if (!isValid(category)) return res.sendStatus(400);
        const invalidName = await alreadyExistCategory(category);
        if (invalidName) return res.status(409).send({ error: "Esta categoria já está registrada." })
        await createP(category);
        return res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(500);
    }
}

async function alreadyExistCategory(category) {
    const categorias = await readP();
    const names = categorias.map(categoria => categoria.name);
    if (names.includes(category.name)) return true;
    return false;
}

function isValid(category) {
    const { error } = categoria.validate(category);
    if (error) return false;
    return true;
}