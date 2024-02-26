// src/models/diskUsage.js
const Event = require('./event');

class DiskUsageEvent extends Event {
  constructor(usage) {
    super('DISK_USAGE', { usage });
  }
}

module.exports = DiskUsageEvent;
