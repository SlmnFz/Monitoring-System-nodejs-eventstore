// src/app.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const port = process.env.PORT || 3000;
const { client, connectToEventStore, disconnectFromEventStore } = require('../src/helpers/eventStore');
const { specs, swaggerUi } = require('./docs/swagger');

const server = http.createServer(app)
const io = socketIo(server)

// Routes
const usage = require('./routes/usage');

app.use("/usage", usage)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/', async (req, res) => {
    await connectToEventStore();
    res.send('Monitoring System is up and running!');
});

app.use((req, res) => {
    console.log(`Requested Path: ${req.path} - ${req.method}`);
    return res.status(404).json({
        error: "❌ Not Found ❌"
    });
});

server.listen(port, () => {
    console.log(`Monitoring System listening at http://localhost:${port}`);
});
