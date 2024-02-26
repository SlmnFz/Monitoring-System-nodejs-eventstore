// src/models/networkUsage.js
const Event = require('./event');

class NetworkUsageEvent extends Event {
    constructor(usage) {
        super('NETWORK_USAGE', { usage });
    }
}

module.exports = NetworkUsageEvent;
