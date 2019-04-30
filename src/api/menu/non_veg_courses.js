import 'dotenv/config';
import db from '../config/config';

/**
 * @description { Get All meal Courses}
 * @param {retunr function} data 
 */
var non_vegCourses = function(data) {
    var statusCode = 0
    var sql = `SELECT course_details.course_id, course_details.course_name, 
    course_details.course_prep_date,
    course_details.course_prep_time,
    course_details.course_notes,
    course_details.course_instructions,
    course_details.course_image, 
    meal_type.meal_type,
    course_type.course_type
    FROM course_details 
    INNER JOIN meal_course
    ON meal_course.id =course_details.course_id
    INNER JOIN course_type
    ON course_type.id = meal_course.course_type
    INNER JOIN meal_type
    ON meal_type.id = meal_course.meal_type
    WHERE meal_course.meal_type = 2`
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



module.exports = {
    non_vegCourses: non_vegCourses,
}