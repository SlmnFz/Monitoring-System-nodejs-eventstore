// src/models/memoryUsage.js
const Event = require('./event');

class MemoryUsageEvent extends Event {
  constructor(usage) {
    super('MEMORY_USAGE', { usage });
  }
}

module.exports = MemoryUsageEvent;
