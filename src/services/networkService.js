// src/services/networkService.js
const { exec } = require('child_process');

function networkUsage() {
    return new Promise((resolve, reject) => {
        exec('netstat -e', (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            if (stderr) {
                reject(stderr);
                return;
            }

            const lines = stdout.trim().split('\n');
            const networkUsage = {};

            for (let i = 3; i < lines.length; i++) {
                const parts = lines[i].trim().split(/\s+/);
                if (parts.length === 3) {
                    networkUsage[parts[0].toLowerCase()] = { received: parts[1], sent: parts[2] };
                }
            }

            resolve(networkUsage);
        });
    });
}

async function collectNetworkUsage() {
    try {
        const usage = await networkUsage();
        return usage;
    } catch (error) {
        console.error('Error fetching network usage:', error);
        throw error;
    }
}

module.exports = { collectNetworkUsage };
