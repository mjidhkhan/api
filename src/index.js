import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import db from './db/database'
const app = express();

app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({
    extended: true,
}));

// Get all Courses
app.get('/', (req, res) => {
    var sql = `SELECT * FROM course_details`
    db.connect.query(sql, function(err, results) {
        if (err) {
            res.statusCode = 500;
            return res.json({ errors: [res.statusCode + ': Could not get data'] });
        }
        // No results returned mean the object is not found
        if (results.length === 0) {
            // We are able to set the HTTP status code on the res object
            res.statusCode = 404;
            return res.json({ errors: ['Course not found'] });
        }
        return res.json(results)

    });
});

//Get course by ID
app.get('/course/:id', (req, res) => {
    var sql = `SELECT * FROM course_details WHERE course_id = ${req.params.id}`
    db.connect.query(sql, function(err, results) {
        if (err) {
            res.statusCode = 500;
            res.json({ errors: [res.statusCode + ': Could not get data'] });
        }
        // No results returned mean the object is not found
        if (results.length === 0) {
            // We are able to set the HTTP status code on the res object
            res.statusCode = 404;
            res.json({ errors: ['Course not found'] });
        }

        res.json(results)

    });
});


app.get('/course/:name', (req, res) => {
    var sql = `SELECT * FROM course_details WHERE course_name = ${req.params.name}`
    db.connect.query(sql, function(err, results) {
        if (err) {
            res.statusCode = 500;
            res.json({ errors: [res.statusCode + ': Could not get data'] });
        }
        // No results returned mean the object is not found
        if (results.length === 0) {
            // We are able to set the HTTP status code on the res object
            res.statusCode = 404;
            res.json({ errors: ['Course not found'] });
        }
        res.json(results)

    });
});


// Get All Stock
app.get('/stock', (req, res) => {
    var sql = `SELECT * FROM stock`
    db.connect.query(sql, function(err, results) {
        if (err) {
            res.statusCode = 500;
            res.json({ errors: [res.statusCode + ': Could not get data'] });
        }
        // No results returned mean the object is not found
        if (results.length === 0) {
            // We are able to set the HTTP status code on the res object
            res.statusCode = 404;
            res.json({ errors: ['Course not found'] });
        }
        res.json(results)

    });
})

app.get('/orders', (req, res) => {
    var sql = `SELECT * FROM orders`
    db.connect.query(sql, function(err, results) {
        if (err) {
            res.statusCode = 500;
            res.json({ errors: [res.statusCode + ': Could not get data'] });
        }
        // No results returned mean the object is not found
        if (results.length === 0) {
            // We are able to set the HTTP status code on the res object
            res.statusCode = 404;
            res.json({ errors: ['Course not found'] });
        }
        res.json(results)

    });
})

// Get All Orders

app.get('/orders/:id', (req, res) => {
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
    WHERE orders.id= ${req.params.id} ORDER BY  order_details.course_id `
    db.connect.query(sql, function(err, results) {
        if (err) {
            res.statusCode = 500;
            res.json({ errors: [res.statusCode + ': Could not get data'] });
        }
        // No results returned mean the object is not found
        if (results.length === 0) {
            // We are able to set the HTTP status code on the res object
            res.statusCode = 404;
            res.json({ errors: ['Course not found'] });
        }
        res.json(results)

    });
})



app.listen(process.env.PORT, () =>
    console.log(`app listening at port:${process.env.PORT}`)
);