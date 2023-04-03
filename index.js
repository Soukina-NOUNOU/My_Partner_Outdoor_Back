require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./app/routers');
const expressSwagger = require('express-swagger-generator')(app);
const confSwagger = require('./app/utils/swagger');
const { errorsCollector, notFound } = require('./app/middlewares/handlers/errorHandlers');


const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL;

// app.use(express.urlencoded({ extended: true }));

expressSwagger(confSwagger);

app.use(express.json());

app.use(router);

// Error handling
app.use(notFound);
app.use(errorsCollector);

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${BASE_URL}:${PORT}`)
});


