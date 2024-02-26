// src/app.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const port = process.env.PORT || 3000;
const { client, connectToEventStore, disconnectFromEventStore } = require('../src/helpers/eventStore');
const { specs, swaggerUi } = require('./docs/swagger');
const path = require('path');

const server = http.createServer(app)
const io = socketIo(server, {
    cors: {
        origin: "*"
    }, allowEIO3: true
})

// Routes
const usage = require('./routes/usage');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use("/usage", usage)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/', async (req, res) => {
    await connectToEventStore();
    res.render('index')
});

// Socket IO
const socketController = require('../src/controllers/socketController');
const onConnection = (socket) => {
    socketController(io, socket)
}
io.on("connection", onConnection);

app.use((req, res) => {
    console.log(`Requested Path: ${req.path} - ${req.method}`);
    return res.status(404).json({
        error: "❌ Not Found ❌"
    });
});

server.listen(port, () => {
    console.log(`Monitoring System listening at http://localhost:${port}`);
});
