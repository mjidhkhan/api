import 'dotenv/config';
import db from '../db/database';

/**
 * @description { Get All meal Courses}
 * @param {retunr function} data 
 */
var getCourses = function(data) {
    var statusCode = 0
    var sql = `SELECT * FROM course_details`
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
var getCourseByID = function(id, data) {
    var statusCode = 0
    var sql = `SELECT * FROM course_details WHERE course_id = ${id}`
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
    getCourses: getCourses,
    getCourseByID: getCourseByID
};