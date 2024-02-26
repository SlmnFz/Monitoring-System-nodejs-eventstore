// src/models/cpuUsage.js
const Event = require('./event');

class CPUUsageEvent extends Event {
  constructor(usage) {
    super('CPU_USAGE', { usage });
  }
}

module.exports = CPUUsageEvent;
