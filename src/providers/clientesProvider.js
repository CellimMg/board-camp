import connection from "../connection/postgreConnection.js";

export async function read() {
    const { rows: response } = await connection.query("SELECT * FROM customers");
    return response;
}

export async function readByCPF(cpf) {
    const { rows: response } = await connection.query("SELECT * FROM customers WHERE costumers.cpf LIKE $1", [`${cpf}%`]);
    return response;
}

export async function readById(id) {
    const { rows: response } = await connection.query("SELECT * FROM customers WHERE costumers.id = $1", [id]);
    return response;
}