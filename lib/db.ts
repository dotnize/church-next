import mysql from "mysql2/promise";
import { mysqlConfig } from "./config";

let connection: null | mysql.Connection = null;

export async function getConnection() {
    if (connection === null) {
        console.log("Creating new MySQL Connection!");
        connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST || mysqlConfig.host,
            port: Number(process.env.MYSQL_PORT) || mysqlConfig.port,
            database: process.env.MYSQL_DATABASE || mysqlConfig.database,
            user: process.env.MYSQL_USER || mysqlConfig.user,
            password: process.env.MYSQL_PASSWORD || mysqlConfig.password,
        });
    }

    return connection;
}
