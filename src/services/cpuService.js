// src/services/cpuService.js
const osUtils = require('os-utils');

function collectCPUUsage() {
    return new Promise((resolve, reject) => {
        osUtils.cpuUsage((usage) => {
            resolve(usage);
        });
    });
}

module.exports = { collectCPUUsage };
