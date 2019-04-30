import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
const app = express();

app.use(cors());


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({
    extended: true,
}));



require('./api/routes/routes.js')(app);

app.listen(process.env.PORT, () =>
    console.log(`app listening at port:${process.env.PORT}`)
);