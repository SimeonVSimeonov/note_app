'use strict';

const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');
const mongoose = require('mongoose');

const init = async () => {
    // Create a server with a host and port
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'], // an array of origins or 'ignore'
                headers: ['Authorization'], // an array of strings - 'Access-Control-Allow-Headers'
                exposedHeaders: ['Accept'], // an array of exposed headers - 'Access-Control-Expose-Headers',
                additionalExposedHeaders: ['Accept'], // an array of additional exposed headers
                maxAge: 60,
                credentials: true // boolean - 'Access-Control-Allow-Credentials'
            }
        }
    });

    //Connect to db
    server.app.db = mongoose.connect('mongodb+srv://simeonoff:test@cluster0-tjtwr.azure.mongodb.net/note_db?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    //Load plugins
    await server.register([require('./routes/note.routes'), require('@hapi/vision')]);


    // Start the server
    await server.start();
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();

