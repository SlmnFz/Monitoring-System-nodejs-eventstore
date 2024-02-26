// src/models/event.js
const { v4 } = require('uuid');

class Event {
    constructor(type, data) {
        this.id = v4()
        this.type = type;
        this.data = data;
        this.timestamp = new Date().toISOString();
    }
}

module.exports = Event;