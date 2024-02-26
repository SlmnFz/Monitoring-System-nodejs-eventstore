// src/services/diskService.js
const checkDiskSpace = require('check-disk-space').default

function collectDiskUsage() {
    return new Promise((resolve, reject) => {
        checkDiskSpace('C:/')
            .then(diskSpaceInfo => {
                resolve(diskSpaceInfo);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports = { collectDiskUsage };
