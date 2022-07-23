import connection from "../connection/postgreConnection.js";

export function read() {
    const response = connection.query("SELECT * FROM categories;");

    return response;
}