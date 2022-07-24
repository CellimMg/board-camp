import connection from "../connection/postgreConnection.js";

export async function read() {
    const { rows: response } = await connection.query("SELECT * FROM customers");
    return response;
}

export async function readByCPF(cpf) {
    const { rows: response } = await connection.query("SELECT * FROM customers WHERE customers.cpf LIKE $1", [`${cpf}%`]);
    return response;
}

export async function readById(id) {
    const { rows: response } = await connection.query("SELECT * FROM customers WHERE customers.id = $1", [id]);
    return response;
}

export async function create(cliente) {
    const { name, phone, cpf, birthday } = cliente;
    await connection.query("INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);",
        [name, phone, cpf, birthday]);
}

export async function update(cliente) {
    const { id, name, phone, cpf, birthday } = cliente;
    await connection.query("UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE customers.id = $5;",
        [name, phone, cpf, birthday, id]);
}