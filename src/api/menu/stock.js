import 'dotenv/config';
import db from '../config/config';

/**
 * @description { Get All meal Courses}
 * @param {retunr function} data 
 */
var getStock = function(data) {
    var statusCode = 0
    var sql = `SELECT * FROM stock`
    db.connect.query(sql, [], (err, rows) => {
        if (err) {
            statusCode = 500;
            return data({ errors: [statusCode + ': Could not get data'] });
        } else if (rows.length === 0) {
            statusCode = 404;
            return data({ errors: [statusCode + ': Course not found'] });
        } else {
            return data(rows);
        }

    });
};

/**
 * @description {Get course detaile by ID}
 * @param { ID Int} id 
 * @param {function } data 
 */
var getStockByID = function(id, data) {
    var statusCode = 0
    var sql = `SELECT * FROM stock WHERE id = ${id}`
    db.connect.query(sql, [], (err, rows) => {
        if (err) {
            statusCode = 500;
            return data({ errors: [statusCode + ': Could not get data'] });
        } else if (rows.length === 0) {
            statusCode = 404;
            return data({ errors: [statusCode + ': Course not found for ID:' + id] });
        } else {
            return data(rows);
        }

    });
};

module.exports = {
    getStock: getStock,
    getStockByID: getStockByID
};