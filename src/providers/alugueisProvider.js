import connection from "../connection/postgreConnection.js";

export async function read() {
    const { rows: response } = await connection.query(
        'SELECT rentals.*, customers.name as customersName, game.name as gameName, ' +
        'game."categoryName", game."categoryId" FROM rentals ' +
        'JOIN customers ON rentals."customerId" = customers.id ' +
        'JOIN(SELECT games.*, categories.name as "categoryName" from games ' +
        'JOIN categories ON games."categoryId" = categories.id) as game ' +
        'ON rentals."gameId" = game.id;');

    return response;
}

export async function readById(id) {
    const { rows: response } = await connection.query(
        'SELECT rentals.*, customers.name as customersName, game.name as gameName, ' +
        'game."categoryName", game."categoryId" FROM rentals ' +
        'JOIN customers ON rentals."customerId" = customers.id ' +
        'JOIN(SELECT games.*, categories.name as "categoryName" from games ' +
        'JOIN categories ON games."categoryId" = categories.id) as game ' +
        'ON rentals."gameId" = game.id WHERE rentals.id = $1;', [id]);

    return response;
}


export async function readByCustomerId(customerId) {
    const { rows: response } = await connection.query(
        'SELECT rentals.*, customers.name as customersName, game.name as gameName, ' +
        'game."categoryName", game."categoryId" FROM rentals ' +
        'JOIN customers ON rentals."customerId" = customers.id ' +
        'JOIN(SELECT games.*, categories.name as "categoryName" from games ' +
        'JOIN categories ON games."categoryId" = categories.id) as game ' +
        'ON rentals."gameId" = game.id WHERE customers.id = $1;', [customerId]);

    return response;
}

export async function readByGameId(gameId) {
    const { rows: response } = await connection.query(
        'SELECT rentals.*, customers.name as customersName, game.name as gameName, ' +
        'game."categoryName", game."categoryId" FROM rentals ' +
        'JOIN customers ON rentals."customerId" = customers.id ' +
        'JOIN(SELECT games.*, categories.name as "categoryName" from games ' +
        'JOIN categories ON games."categoryId" = categories.id) as game ' +
        'ON rentals."gameId" = game.id WHERE game.id = $1;', [gameId]);

    return response;
}

export async function create(rental) {
    const { customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee } = rental;
    await connection.query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);',
        [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]);
}

export async function remove(rentalId) {
    await connection.query('DELETE FROM rentals WHERE rentals.id = $1;', [rentalId]);
}

export async function update(delayFee, returnDate, id) {
    await connection.query('UPDATE rentals SET "delayFee" = $1, "returnDate" = $2 WHERE id = $3;', [delayFee, returnDate, id])
}
