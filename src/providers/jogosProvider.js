import connection from "../connection/postgreConnection.js";

export async function read() {
    const { rows: response } =
        await connection.query('SELECT games.*, categories.name as category FROM games JOIN categories ON games."categoryId" = categories.id;');
    return response;
}


export async function readById(gameId) {
    const { rows: response } =
        await connection.query('SELECT games.*, categories.name as category FROM games JOIN categories ON games."categoryId" = categories.id WHERE games.id = $1;', [gameId]);
    return response;
}


export async function readByName(name) {

    const queryString =
        'SELECT games.*, categories.name as category FROM games JOIN categories ON games."categoryId" = categories.id WHERE LOWER(games.name) LIKE $1;';

    const { rows: response } =
        await connection.query(queryString, [`${name.toLowerCase()}%`]);

    return response;
}


export async function create(game) {
    const { name, image, stockTotal, categoryId, pricePerDay } = game;
    await connection.query(
        'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);',
        [name, image, stockTotal, categoryId, pricePerDay]
    );
}
