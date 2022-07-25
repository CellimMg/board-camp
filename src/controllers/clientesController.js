import { read as readP, readByCPF, readById as readByIdP, create as createP, update as updateP } from "../providers/clientesProvider.js";
import clienteM from "../models/clientesModel.js"

export async function read(req, res) {
    const { cpf } = req.query;
    const { id } = req.params;
    let response;

    if (cpf) {
        response = await readByCPF(cpf);
    } else {
        response = await readP(cpf);
    }

    return res.status(200).send(response);
}


export async function readById(req, res) {
    const { id } = req.params;
    let response;

    if (id) {
        response = await readByIdP(id);
        console.log(response);
        if (response.length == 0) return res.sendStatus(404);
    } else {
        response = await readP(cpf);
    }

    return res.status(200).send(response);
}

export async function create(req, res) {
    const cliente = req.body;

    if (!isValid(cliente)) return res.sendStatus(400);
    const hasCPF = await alreadyHasCPF(cliente.cpf);
    if (hasCPF) return res.sendStatus(409);
    await createP(cliente);
    return res.sendStatus(201);
}


export async function update(req, res) {
    const cliente = req.body;
    const { id } = req.params;

    if (!isValid(cliente)) return res.sendStatus(400);
    const hasCPF = await alreadyHasCPF(cliente.cpf);
    if (hasCPF) return res.sendStatus(409);
    await updateP({ ...cliente, id });
    return res.sendStatus(200);
}


async function alreadyHasCPF(cpf) {
    const clientes = await readP();
    const cpfs = clientes.map(cliente => cliente.cpf);
    if (cpfs.includes(cpf)) return true;
    return false;
}

function isValid(cliente) {
    const { error } = clienteM.validate(cliente);

    if (error) return false;
    return true;
}