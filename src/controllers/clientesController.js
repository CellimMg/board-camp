import { read as readP, readByCPF, readById as readByIdP } from "../providers/clientesProvider.js";

export async function read(req, res) {
    const { cpf } = req.query;
    const { id } = req.params;
    let response;

    if (cpf) {
        response = await readByCPF(cpf);
    } else {
        response = await readP(cpf);
    }

    return res.status(200).send({ clientes: response });
}


export async function readById(req, res) {
    const { id } = req.params;
    let response;

    if (id) {
        response = await readByIdP(id);
        if (response.length == 0) return res.sendStatus(404);
    } else {
        response = await readP(cpf);
    }

    return res.status(200).send({ clientes: response });
}