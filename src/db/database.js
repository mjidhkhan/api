import mysql from 'mysql';
import 'dotenv/config';

var connect = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
module.exports = {
    connect: connect

}