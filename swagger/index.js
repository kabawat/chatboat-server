const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'Description of your API',
        },
        servers: [
            {
                url: process.env.SERVER_URL, // Change this URL as per your server
            },
        ],
    },
    apis: [
        "./swagger/auth/*.js",
        './swagger/registration/*.js',
        './swagger/profile/*.js',
        './swagger/users/*.js',
        './swagger/contact/*.js',
        './swagger/chat/*.js',
        './swagger/message/*.js',
        './swagger/static/*.js',

    ], // Path to the API routes directory
};

const specs = swaggerJsdoc(options);

module.exports = specs;
