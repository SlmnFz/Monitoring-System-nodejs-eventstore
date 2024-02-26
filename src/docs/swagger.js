const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const port = process.env.PORT || 3000;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Monitoring System API',
            version: '1.0.0',
            description: 'API documentation for the Monitoring System',
            license: {
                name: 'Licensed Under MIT',
                url: 'https://github.com/SlmnFz/Monitoring-System-nodejs-eventstore/blob/main/LICENCE',
            },
            contact: {
                name: 'SalmanFz',
                url: 'https://www.linkedin.com/in/salmanfz/',
            },
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
