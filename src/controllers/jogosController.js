import jogo from "../models/jogosModel.js";
import { readByName, read as readP, create as createP } from "../providers/jogosProvider.js";

export async function read(req, res) {
    const { name } = req.query;
    let response;
    if (name) {
        response = await readByName(name.toLowerCase());
    } else {
        response = await readP();
    }

    return res.status(200).send({ games: response });
}


export async function create(req, res) {
    const game = req.body;

    if (!isValid(game)) return res.sendStatus(400);

    const existName = await alreadyExist(game.name);
    if (existName) return res.sendStatus(409);

    await createP(game);
    return res.sendStatus(200);
}



export async function alreadyExist(gameName) {
    const games = await readP();
    const gamesNames = games.map(game => game.name);

    if (gamesNames.includes(gameName)) return true;
    return false;
}

export function isValid(game) {
    const { error } = jogo.validate(game);
    console.log(error);
    if (error) return false;
    return true;
}