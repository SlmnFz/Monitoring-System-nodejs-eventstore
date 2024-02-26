// src/services/memoryService.js
const osUtils = require('os-utils');
const os = require('os');

function collectMemoryUsage() {
    return new Promise((resolve, reject) => {
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const usedMemory = totalMemory - freeMemory;
        resolve({ totalMemory, freeMemory, usedMemory });
    });
}

module.exports = { collectMemoryUsage };
