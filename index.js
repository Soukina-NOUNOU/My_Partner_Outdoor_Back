require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./app/routers');
const { errorsCollector, notFound } = require('./app/middlewares/handlers/errorHandlers');
const expressSwagger = require('express-swagger-generator')(app);
const confSwagger = require('./app/utils/swagger');
const session = require('express-session');

const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL;


expressSwagger(confSwagger);


app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie:{
            secure: false, // Mettre true si le site est https (false c'est pour http)
            maxAge: 60 * 60 * 1000, // session 1H
        }
    })
);

app.use((req, res, next) => {
    app.locals.session = req.session;
    if(req.session.mypartner === undefined) {
        req.session.mypartner = [];
    }
    next();
});

app.use(express.json());

app.use(router);

// Error handling
app.use(notFound);
app.use(errorsCollector);

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${BASE_URL}:${PORT}`)
});


