import connection from "../connection/postgreConnection.js";

export async function read() {
    const { rows: response } = await connection.query('SELECT * FROM categories;');
    return response;
}

export async function create(category) {
    const { name } = category;
    await connection.query('INSERT INTO categories (name) VALUES ($1);', [name]);
}