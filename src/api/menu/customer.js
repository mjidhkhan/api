import 'dotenv/config';
import db from '../config/config';

/**
 * @description { Get All meal Courses}
 * @param {retunr function} data 
 */
var getCustomers = function(data) {
    var statusCode = 0
    var sql = `SELECT * FROM users WHERE status = 3`
    db.connect.query(sql, [], (err, rows) => {
        if (err) {
            statusCode = 500;
            return data({ errors: [statusCode + ': Could not get data'] });
        } else if (rows.length === 0) {
            statusCode = 404;
            return data({ errors: [statusCode + `: Customers dtat not found.`] });
        } else {
            return data(rows);
        }

    });
};
/**
 * @description { Get All meal Courses}
 * @param {retunr function} data 
 */
var customerByID = function(id, data) {
    var statusCode = 0
    var sql = `SELECT * FROM users WHERE status = 3 AND id= ${id}`
    db.connect.query(sql, [], (err, rows) => {
        if (err) {
            statusCode = 500;
            return data({ errors: [statusCode + ': Could not get data'] });
        } else if (rows.length === 0) {
            statusCode = 404;
            return data({ errors: [statusCode + `: Customer not found with ID : ${id}`] });
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
var customerByIDWithOrder = function(id, data) {
    var statusCode = 0
    var sql = `SELECT DISTINCT users.fullname,users.email, 
    orders.id, orders.booking_date,
    order_details.course_id,
    order_details.course_name, 
    order_details.servings, 
    order_details.order_status,
    meal_type.meal_type, course_type.course_type 
    FROM users
    INNER JOIN orders 
    ON orders.customer_id = users.id
    INNER JOIN order_details 
    ON order_details.order_id = orders.id
    INNER JOIN meal_type 
    ON order_details.meal_type = meal_type.id
    INNER JOIN course_type 
    ON order_details.course_type = course_type.id
    WHERE orders.customer_id= ${id} ORDER BY  order_details.course_id `
    db.connect.query(sql, [], (err, rows) => {
        if (err) {
            statusCode = 500;
            return data({ errors: [statusCode + ': Could not get data'] });
        } else if (rows.length === 0) {
            statusCode = 404;
            return data({ errors: [statusCode + ': Customer Order not found for ID:' + id] });
        } else {
            return data(rows);
        }

    });
};

module.exports = {
    getCustomers: getCustomers,
    customerByID: customerByID,
    customerByIDWithOrder: customerByIDWithOrder
};