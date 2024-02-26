const { collectMemoryUsage } = require('../services/memoryService');
const MemoryUsageEvent = require('../models/memoryUsage');
const { client } = require('../helpers/eventStore');
const { jsonEvent } = require('@eventstore/db-client');


async function collectAndStoreMemoryUsage() {
    try {
        const memoryUsage = await collectMemoryUsage()
        const memoryUsageEvent = new MemoryUsageEvent(memoryUsage)
        const event = jsonEvent(memoryUsageEvent)
        await client.appendToStream('memory-usage-stream', event)
        console.log('memory usage event collected and stored successfully');
        // res.status(200).json({ message: 'memory usage event collected and stored successfully', memoryUsageEvent });
    } catch (error) {
        console.error('Error collecting and storing memory usage event:', error);
        // res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { collectAndStoreMemoryUsage }