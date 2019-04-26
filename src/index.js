import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import db from './db/db'
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));
app.listen(process.env.PORT, () =>
    console.log(`app listening at port:${process.env.PORT}`)
);

app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
});
/*
app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
});





app.get('/users', (req, res) => {
    return res.send('GET HTTP method on user resource');
});

app.post('/users', (req, res) => {
    return res.send('POST HTTP method on user resource');
});

app.put('/users', (req, res) => {
    return res.send('PUT HTTP method on user resource');
});

app.delete('/users', (req, res) => {
    return res.send('DELETE HTTP method on user resource');
});

*/
app.get('/users/:id', (req, res, next) => {
    var uId = req.params.id;
    var sql = 'SELECT * FROM users WHERE id =?';
    db.connect.query(sql, [uId], function(err, results) {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            return res.json({ errors: [res.statusCode + ': Could not get photo'] });
        }
        // No results returned mean the object is not found
        if (results.length === 0) {
            // We are able to set the HTTP status code on the res object
            res.statusCode = 404;
            return res.json({ errors: ['User not found'] });
        }
        return res.json(results)

    });
});
app.get('/users/:id/:name', (req, res, next) => {
    var name = req.params.name;
    console.log(name)
    var sql = 'SELECT * FROM users WHERE username=?';
    db.connect.query(sql, [name], function(err, results) {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            return res.json({ errors: [res.statusCode + ': Could not get photo'] });
        }
        // No results returned mean the object is not found
        if (results.length === 0) {
            // We are able to set the HTTP status code on the res object
            res.statusCode = 404;
            return res.json({ errors: ['User not found'] });
        }

        return res.json(results)

    });
});