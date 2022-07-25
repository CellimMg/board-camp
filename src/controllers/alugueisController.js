import aluguel from "../models/alugueisModel.js";
import { remove as removeP, update as updateP, read as readP, readByCustomerId, readByGameId, readById, create as createP } from "../providers/alugueisProvider.js";
import { readById as readCustomer } from "../providers/clientesProvider.js"
import { readById as readGame } from "../providers/jogosProvider.js"

export async function read(req, res) {
    const { gameId, customerId } = req.query;
    let response;

    if (gameId) {
        response = await readByGameId(gameId);
    } else if (customerId) {
        response = await readByCustomerId(customerId);
    } else {
        response = await readP();
    }
    const formattedResponse = response.map(rental => formatRental(rental));
    return res.status(200).send(formattedResponse);
}


export async function create(req, res) {
    const rental = req.body;

    const validCustomer = await isValidCustomerId(rental.customerId);
    const validGame = await isValidGameId(rental.gameId);
    const validCount = await isGameAvailable(validGame);
    if (!validCustomer || !validGame || !isValid(rental) || !validCount) return res.sendStatus(400);

    rental.returnDate = null;
    rental.delayFee = null;
    rental.rentDate = new Date().toISOString().split("T")[0];
    rental.originalPrice = rental.daysRented * validGame.pricePerDay;

    await createP(rental);
    return res.sendStatus(201);
}


export async function remove(req, res) {
    const { id } = req.params;
    const rental = await readById(id);
    if (rental.length <= 0) return res.sendStatus(404);
    else if (rental[0].returnDate == null) return res.sendStatus(400);

    await removeP(id);

    return res.sendStatus(200);
}

export async function update(req, res) {
    const { id } = req.params;
    const rental = await readById(id);
    console.log(rental);

    if (rental.length == 0) return res.sendStatus(404);
    else if (rental[0].returnDate != null) return res.sendStatus(400);

    const date = rental[0].rentDate;
    const returnDate = new Date(Date.now());
    const diffDays = Math.ceil((returnDate - date) / (1000 * 60 * 60 * 24)) - 1;


    let delayFee = null;
    if (diffDays > rental[0].daysRented) {
        delayFee = diffDays * rental[0].originalPrice;
    }

    await updateP(delayFee, returnDate, id);
    return res.sendStatus(200);
}



async function isGameAvailable(game) {
    const rentals = await readP();
    console.log(game.id);
    console.log(rentals);
    const gameRentals = rentals.filter(rental => rental.gameId == game.id);
    console.log(gameRentals);
    if (gameRentals.length < game.stockTotal) return true;
    return false;
}

function isValid(rental) {
    const { error } = aluguel.validate(rental);
    if (error) return false;
    return true;
}

async function isValidCustomerId(customerId) {
    const response = await readCustomer(customerId);
    if (response.length > 0) return response[0];
    return false;
}

async function isValidGameId(gameId) {
    const response = await readGame(gameId);
    if (response.length > 0) return response[0];
    return false;
}


function formatRental(rental) {
    const customer = {
        id: rental.customerId,
        name: rental.customersname,
    };

    const game = {
        name: rental.gamename,
        categoryName: rental.categoryName,
        categoryId: rental.categoryId,
        id: rental.gameId
    };

    rental.customer = customer;
    rental.game = game;
    rental.rentDate = rental.rentDate.toISOString().split("T")[0];
    rental.returnDate = rental.returnDate?.toISOString().split("T")[0];
    delete rental.gamename;
    delete rental.categoryName;
    delete rental.categoryId;
    delete rental.gameId;
    delete rental.customerId;
    delete rental.customersname;
    return rental;
}